from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Cart, Order, OrderDetail, OrderStatus, Purchase
from coupon.models import Coupon, CouponUser, CouponStatus
from product.models import Product, ProductOption, ProductImage, Brand
from product.serializers import ProductImageSerializer
from account.serializers import UserInfoEditSerializer


class CartSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
    )
    product_option_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductOption.objects.all(),
        write_only=True,
    )
    product = serializers.SerializerMethodField(read_only=True)
    product_option = serializers.SerializerMethodField(read_only=True)
    product_image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'product_id', 'product', 'product_option_id', 'product_option', 'product_image', 'price', 'quantity']

    def get_product(self, obj):
        request_data = self.context['request'].data
        
        if not request_data:
            product = obj.product_id
        else:
            product_id = request_data.get('product_id')
            product = Product.objects.get(id=product_id)

        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'view_count': product.view_count,
            'brand': {
                'id': product.brand_id.id,
                'name': product.brand_id.name,
                'description': product.brand_id.description,
            }
        }

        return product_data
    
    def get_product_option(self, obj):
        request_data = self.context['request'].data
        if not request_data:
            product_option = obj.product_option_id
        else:
            product_option_id = request_data.get('product_option_id')
            product_option = ProductOption.objects.get(id=product_option_id)
        
        product_option_data = {
            'id': product_option.id,
            'option_size': product_option.option_size,
            'option_color': product_option.option_color,
            'price': product_option.price,
            'delivery_fee': product_option.delivery_fee,
            'quantity': product_option.quantity,
        }
        return product_option_data
    
    def get_product_image(self, obj):
        request = self.context.get('request')
        request_data = self.context['request'].data

        if not request_data:
            product = obj.product_id
        else:
            product_id = request_data.get('product_id')
            product = Product.objects.get(id=product_id)

        try:
            image = product.productimage_set.first()
            if image:
                image_url = request.build_absolute_uri(image.image_src.url)
                return image_url
        except ProductImage.DoesNotExist:
            pass
        return None
    

class OrderSerializer(serializers.ModelSerializer):
    coupon_user_id = serializers.PrimaryKeyRelatedField(
        queryset=CouponUser.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )
    coupon_user = serializers.SerializerMethodField(read_only=True)
    order_details = serializers.SerializerMethodField()
    user = UserInfoEditSerializer(source='user_id', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_details',
            'coupon_user_id',
            'coupon_user',
            'total_price',
            'discount_price',
            'delivery_fee',
            'recipient',
            'contact',
            'postcode',
            'address',
            'memo',
            'detail_address',
            'created_at',
            'user',
        ]

    def get_order_details(self, obj):
        order_details = obj.orderdetail_set.all()
        context = self.context.copy()  # 기존 context 복사
        context['request'] = self.context['request']  # 필요한 context 추가
        serializer = OrderDetailSerializer(order_details, many=True, context=context)
        return serializer.data

    def get_coupon_user(self, obj):
        coupon_user = obj.coupon_user_id
        
        # 쿠폰 적용을 안했을 때
        if coupon_user is None:
            return None
        
        coupon_user_data = {
            'id': coupon_user.id,
            'is_used': coupon_user.is_used,
            'use_date': coupon_user.use_date,
            'download_date': coupon_user.download_date,
            'coupon': {
                'id': coupon_user.coupon_id.id,
                'description': coupon_user.coupon_id.description,
                'is_active': coupon_user.coupon_id.is_active,
                'start_date': coupon_user.coupon_id.start_date,
                'end_date': coupon_user.coupon_id.end_date,
            }
        }
        return coupon_user_data
    
    def create(self, validated_data):
        order_details_data = self.context['request'].data.get('order_details', []) 
        coupon_user_id = validated_data.get('coupon_user_id')
        order = Order.objects.create(**validated_data)

        # OrderDetail 생성
        for order_detail_data in order_details_data:
            # print("order_detail_data : ", order_detail_data)
            product = Product.objects.filter(pk=order_detail_data['product_id']).first()
            product_option = ProductOption.objects.filter(pk=order_detail_data['product_option_id']).first()
            brand = Brand.objects.filter(pk=order_detail_data['brand_id']).first()
            order_detail = OrderDetail.objects.create(
                order_id=order, 
                product_id=product,
                product_option_id=product_option,
                brand_id=brand,
                quantity=order_detail_data['quantity'],
                price=order_detail_data['price'],
            )

            # OrderStatus 생성
            OrderStatus.objects.create(
                order_detail_id=order_detail
            )

            # 주문시 장바구니 비우기
            if product and Cart.objects.filter(product_id=product, user_id=self.context['request'].user, product_option_id=product_option).exists():
                Cart.objects.filter(product_id=product, user_id=self.context['request'].user, product_option_id=product_option).delete()

        # 쿠폰의 is_used 변경
        if coupon_user_id:
            coupon_user_id.is_used = CouponStatus.USED.value
            coupon_user_id.save()
        
        return order
    

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = "__all__"


class OrderDetailSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True
    )
    product_option_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductOption.objects.all(),
        write_only=True
    )
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        write_only=True
    )
    
    product = serializers.SerializerMethodField(read_only=True)
    product_option = serializers.SerializerMethodField(read_only=True)
    brand = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField()

    class Meta:
        model = OrderDetail
        fields = [
            'id', 
            'product_id',
            'product_option_id',
            'brand_id',
            'product',
            'product_option',
            'brand',
            'quantity',
            'price',
            'status',
        ]
    
    def get_status(self, obj):
        status = obj.orderstatus_set.all()
        serializer = OrderStatusSerializer(status, many=True)
        return serializer.data

    def get_product(self, obj):
        product = obj.product_id
        product = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'view_count': product.view_count,
            'image_src': self.context['request'].build_absolute_uri(product.productimage_set.first().image_src.url),
        }
        return product
    
    def get_product_option(self, obj):
        product_option = obj.product_option_id
        product_option_data = {
            'id': product_option.id,
            'option_size': product_option.option_size,
            'option_color': product_option.option_color,
            'price': product_option.price,
            'delivery_fee': product_option.delivery_fee,
            'quantity': product_option.quantity,
        }
        return product_option_data

    def get_brand(self, obj):
        brand = obj.brand_id
        brand_data = {
            'id': brand.id,
            'name': brand.name,
            'description': brand.description,
            'logo_img': self.context['request'].build_absolute_uri(brand.logo_img.url),
            'links': brand.links,
        }
        return brand_data
    

class PurchaseSerializer(serializers.ModelSerializer):
    # product_id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Purchase
        fields = ['id']

    # def get_product_id(self, obj):
    #     return obj.product_id.id
    
    def create(self, validated_data):
        products_data = self.context['request'].data.get('products')
        user = self.context['request'].user
        purchases = []
        for product_data in products_data:
            product_id = Product.objects.filter(id=product_data['product_id']).first()

            # 중복된 객체를 삭제하고 최신 객체로 만듦
            Purchase.objects.filter(user_id=user, product_id=product_id).delete()
            purchase = Purchase.objects.create(user_id=user, product_id=product_id)
            purchases.append(purchase)
        return purchases