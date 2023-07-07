from rest_framework import serializers
from .models import Cart, Order, OrderDetail
from coupon.models import Coupon, CouponUser
from product.models import Product, ProductOption, ProductImage, Brand
from product.serializers import ProductImageSerializer


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
        product = obj.product_id
        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'view_count': product.view_count,
        }

        return product_data
    
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
    
    def get_product_image(self, obj):
        request = self.context.get('request')
        print(request)
        product = obj.product_id
        try:
            # Assuming there is only one image associated with the product
            image = product.productimage_set.first()
            if image:
                image_url = request.build_absolute_uri(image.image_src.url)
                return image_url
        except ProductImage.DoesNotExist:
            pass
        return None
    

class OrderSerializer(serializers.ModelSerializer):
    order_details = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'order_details', 'total_price', 'delivery_fee', 'created_at']

    def get_order_details(self, obj):
        order_details = obj.orderdetail_set.all()
        serializer = OrderDetailSerializer(order_details, many=True)
        return serializer.data

    def create(self, validated_data):
        order_details_data = self.context['request'].data.get('order_details', []) 
        order = Order.objects.create(**validated_data)

        # OrderDetail 생성
        for order_detail_data in order_details_data:
            # print("order_detail_data : ", order_detail_data)
            product = Product.objects.filter(pk=order_detail_data['product_id']).first()
            product_option = ProductOption.objects.filter(pk=order_detail_data['product_option_id']).first()
            coupon_user = CouponUser.objects.filter(pk=order_detail_data['coupon_user_id']).first()
            brand = Brand.objects.filter(pk=order_detail_data['brand_id']).first()
            order_detail = OrderDetail.objects.create(
                order_id=order, 
                product_id=product,
                product_option_id=product_option,
                brand_id=brand,
                coupon_user_id=coupon_user,
                quantity=order_detail_data['quantity'],
                price=order_detail_data['price'],
            )

        return order


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
    coupon_user_id = serializers.PrimaryKeyRelatedField(
        queryset=CouponUser.objects.all(),
        write_only=True
    )
    product = serializers.SerializerMethodField(read_only=True)
    product_option = serializers.SerializerMethodField(read_only=True)
    brand = serializers.SerializerMethodField(read_only=True)
    coupon_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderDetail
        fields = [
            'id', 
            'product_id',
            'product_option_id',
            'brand_id',
            'coupon_user_id',
            'product',
            'product_option',
            'brand',
            'coupon_user',
            'quantity',
            'price',
        ]

    def get_product(self, obj):
        product = obj.product_id
        product = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'view_count': product.view_count,
            'image_src': product.productimage_set.first().image_src.url,
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
            'logo_img': brand.logo_img.url,
            'links': brand.links,
        }
        return brand_data

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