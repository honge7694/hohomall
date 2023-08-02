from rest_framework import serializers
from .models import Brand, Product, ProductImage, ProductOption
from review.models import Review
import locale
import json


locale.setlocale(locale.LC_ALL, '') # 현재 환경의 로칼 설정

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = [
            'id',
            'name',
            'description',
            'created_at',
            'updated_at',
            'logo_img',
            'links'
        ]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = [
            'id', 'product_id', 'image_src'
        ]


class ProductOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOption
        fields = [
            'id', 
            'product_id', 
            'option_size', 
            'option_color', 
            'price', 
            'delivery_fee', 
            'quantity', 
            'is_active'
        ]


# class ProductInfoSerializer(serializers.ModelSerializer):
#     model = Product
#     fields = [
#         'id',
#         'name',
#         ''
#     ]

class ProductSerializer(serializers.ModelSerializer):
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        write_only=True
    )
    brand = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField()
    options = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField(read_only=True)
    review_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'content',
            'brand_id',
            'brand',
            'product_type',
            'product_subtype',
            'product_style',
            'purchase_count',
            'price',
            'view_count',
            'review_count',
            'rating',
            'images',
            'options',
            'created_at',
            'updated_at',
            'is_active'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # 가격 필드를 포맷팅된 문자열로 변환
        representation['price'] = locale.format_string("%d", int(instance.price), grouping=True)
        return representation
    
    def get_review_count(self, obj):
        review = Review.objects.filter(product_id=obj.id)
        return len(review)

    def get_rating(self, obj):
        rating = Review.objects.filter(product_id=obj.id).values_list('rating', flat=True)
        if rating:
            average_rating = sum(rating) / len(Review.objects.filter(product_id=obj.id))
            return average_rating
        return 0

    def get_images(self, obj):
        """
        이미지 가져오기
        """
        image = obj.productimage_set.all()
        return ProductImageSerializer(instance=image, many=True, context=self.context).data
    
    def get_options(self, obj):
        """
        상품 옵션
        """
        option = obj.productoption_set.all()
        return ProductOptionSerializer(instance=option, many=True, context=self.context).data
    
    def get_brand(self, obj):
        """
        브랜드 정보
        """
        brand = obj.brand_id
        if brand:
            brand_data = {
                'id': brand.id,
                'name': brand.name,
                'description': brand.description,
                'logo_img': self.context['request'].build_absolute_uri(brand.logo_img.url),
                'links': brand.links
            }
        return brand_data
    

    def create(self, validated_data):
        """
        Product + ProductOption + ProductImage 생성
        """
        images_data = self.context['request'].FILES.getlist('images')
        options_data_str = self.context['request'].data.get('options', '[]')
        options_data = json.loads(options_data_str)
        product = Product.objects.create(**validated_data)

        for image_data in images_data:
            ProductImage.objects.create(product_id=product, image_src=image_data)

        for option_data in options_data:
            option_data = dict(option_data) 
            ProductOption.objects.create(product_id=product, **option_data)

        return product
    
    def update(self, instance, validated_data):
        deleted_images_str = self.context['request'].data.get('deleted_images', '[]')
        deleted_images = json.loads(deleted_images_str)
        options_data_str = self.context['request'].data.get('options', '[]')
        options_data = json.loads(options_data_str)
        deleted_option_str = self.context['request'].data.get('deleted_option_ids', [])
        deleted_option_ids = json.loads(deleted_option_str)
        print('deleted_option_ids : ', deleted_option_ids)
        new_images = self.context['request'].FILES

        # 이미지 삭제 처리
        for image_id in deleted_images:
            instance.productimage_set.filter(id=image_id).delete()
        
        # 새로운 이미지 추가 처리
        for image_data in new_images.getlist('new_images'):
            ProductImage.objects.create(product_id=instance, image_src=image_data)

        # ProductOption 삭제
        for option_id in deleted_option_ids:
            print('option_id : ', option_id)
            ProductOption.objects.filter(id=option_id, product_id=instance).delete()

        # ProductOption 업데이트
        for option_data in options_data:
            option_id = option_data.get('id')
            if option_id:
                # 옵션 데이터에 id가 있다면, 기존 데이터 업데이트
                option_instance = ProductOption.objects.get(id=option_id, product_id=instance.id)
                option_serializer = ProductOptionSerializer(option_instance, data=option_data)
                if option_serializer.is_valid():
                    option_serializer.save()
            else:
                # 옵션 데이터에 id가 없다면, 새로운 데이터 생성
                ProductOption.objects.create(product_id=instance, **option_data)

        # Product 모델의 필드 업데이트
        instance.product_type = validated_data.get('product_type', instance.product_type)
        instance.product_subtype = validated_data.get('product_subtype', instance.product_subtype)
        instance.product_style = validated_data.get('product_style', instance.product_style)
        instance.brand_id = validated_data.get('brand_id', instance.brand_id)
        instance.name = validated_data.get('name', instance.name)
        instance.content = validated_data.get('content', instance.content)
        instance.purchase_count = validated_data.get('purchase_count', instance.purchase_count)
        instance.price = validated_data.get('price', instance.price)
        instance.save()

        return instance






