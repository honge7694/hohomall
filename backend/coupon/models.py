from django.db import models
from django.contrib.auth import get_user_model
from product.models import Brand
from enum import Enum


User = get_user_model()

class Coupon(models.Model):
    brand_id = models.ForeignKey(Brand, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    image_src = models.ImageField(blank=True, upload_to="coupons/%Y/%m/%d")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.CharField(max_length=1, default='Y')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'coupon'

    def __str__(self) -> str:
        return f"[{self.brand_id.name}] {self.name}"


class CouponStatus(Enum):
    USED = '사용'
    NOT_USED = '미사용'


class CouponUser(models.Model):
    coupon_id = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    is_used = models.CharField(
        max_length=10, 
        choices=[(status.value, status.name) for status in CouponStatus], 
        default=CouponStatus.NOT_USED.value
    )
    download_date = models.DateTimeField(auto_now_add=True)
    use_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'coupon_user'


