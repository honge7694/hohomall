from rest_framework import serializers
from .models import Brand, Product, ProductImage, ProductOption
from review.models import Review
import locale

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
        options_data = self.context['request'].data.get('options', [])
        product = Product.objects.create(**validated_data)

        for image_data in images_data:
            ProductImage.objects.create(product_id=product, image_src=image_data)

        for option_data in options_data:
            option_data = dict(option_data) 
            ProductOption.objects.create(product_id=product, **option_data)

        return product






