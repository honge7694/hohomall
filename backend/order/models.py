from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product, ProductOption, Brand
from coupon.models import CouponUser
from enum import Enum


User = get_user_model()

class Order(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon_user_id = models.ForeignKey(CouponUser, on_delete=models.CASCADE, null=True, blank=True)
    total_price = models.IntegerField()
    discount_price = models.IntegerField()
    delivery_fee = models.FloatField(default='3000')
    recipient = models.CharField(max_length=100)  
    contact = models.CharField(max_length=20) 
    postcode = models.CharField(max_length=10) 
    address = models.CharField(max_length=200)  
    detail_address = models.CharField(max_length=200)
    memo = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'order'


class OrderDetail(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_option_id = models.ForeignKey(ProductOption, on_delete=models.CASCADE)
    brand_id = models.ForeignKey(Brand, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()

    class Meta:
        db_table = 'order_detail'


class OrderParcelStatus(Enum):
    PREPARING = '배송준비중'
    IN_TRANSIT = '배송중'
    DELIVERED = '배송완료'


class OrderStatus(models.Model):
    order_detail_id = models.ForeignKey(OrderDetail, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=100, 
        choices=[(status.value, status.name) for status in OrderParcelStatus],
        default=OrderParcelStatus.PREPARING.value
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'order_status'


class Cart(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_option_id = models.ForeignKey(ProductOption, on_delete=models.CASCADE)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['-id']


class Purchase(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
