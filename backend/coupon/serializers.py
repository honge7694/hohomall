from rest_framework import serializers
from .models import Coupon, CouponUser
from product.models import Brand


class CouponSerializer(serializers.ModelSerializer):
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        write_only=True
    )
    brand = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Coupon
        fields = ['id', 'brand_id', 'brand', 'name', 'description', 'discount_rate', 'image_src', 'start_date', 'end_date', 'is_active', 'created_at', 'updated_at']

    def get_brand(self, obj):
        brand = obj.brand_id
        brand_data = {
            'id': brand.id,
            'name': brand.name,
            'description': brand.description,
            'logo_img': self.context['request'].build_absolute_uri(brand.logo_img.url),
            'links': brand.links
        }

        return brand_data

class CouponUserSerializer(serializers.ModelSerializer):
    coupon_id = serializers.PrimaryKeyRelatedField(
        queryset=Coupon.objects.all(),
        write_only=True
    )
    coupon = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CouponUser
        fields = ['id', 'coupon_id', 'coupon', 'is_used', 'download_date', 'use_date']

    def get_coupon(self, obj):
        coupon = obj.coupon_id
        coupon_data = {
            'id': coupon.id,
            'brand_id': coupon.brand_id.id,
            'brand_name': coupon.brand_id.name,
            'name': coupon.name,
            'description': coupon.description,
            'discount_rate': coupon.discount_rate,
            'image_src': self.context['request'].build_absolute_uri(coupon.image_src.url),
            'start_date': coupon.start_date,
            'end_date': coupon.end_date,
            'is_active': coupon.is_active
        }

        return coupon_data