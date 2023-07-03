from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product, ProductOption, Brand
from coupon.models import Coupon
from enum import Enum


User = get_user_model()


class Order(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'order'


class OrderDetail(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_option_id = models.ForeignKey(ProductOption, on_delete=models.CASCADE)
    brand_id = models.ForeignKey(Brand, on_delete=models.CASCADE)
    coupon_id = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    delivery_fee = models.FloatField()

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
