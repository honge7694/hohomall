from rest_framework import serializers
from .models import Coupon, CouponUser
from account.serializers import UserInfoEditSerializer


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'name', 'description', 'discount_rate', 'image_src', 'start_date', 'end_date', 'is_active', 'created_at', 'updated_at']


class CouponUserSerializer(serializers.ModelSerializer):
    coupon_id = serializers.PrimaryKeyRelatedField(
        queryset=Coupon.objects.all(),
        write_only=True
    )
    coupon = CouponSerializer(read_only=True, source='coupon_id')
    user = UserInfoEditSerializer(read_only=True, source='user_id')

    class Meta:
        model = CouponUser
        fields = ['id', 'coupon_id', 'user', 'coupon', 'is_used', 'download_date', 'use_date']