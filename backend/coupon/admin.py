from django.contrib import admin
from .models import Coupon, CouponUser


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    pass


@admin.register(CouponUser)
class CouponUserAdmin(admin.ModelAdmin):
    pass