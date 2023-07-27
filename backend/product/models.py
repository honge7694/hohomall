from django.db import models
from enum import Enum 


class Brand(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    logo_img = models.ImageField(max_length=255, upload_to="product/%Y/%m/%d", blank=True)
    links = models.CharField(max_length=1000)

    class Meta:
        db_table = 'brand'

    def __str__(self):
        return f"[{self.name}] {self.description}"


class Product(models.Model):
    name = models.CharField(max_length=100)
    brand_id = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE
    )
    product_type = models.CharField(max_length=50)
    product_subtype = models.CharField(max_length=50)
    product_style = models.CharField(max_length=50)
    purchase_count = models.IntegerField(default=0)
    price = models.CharField(max_length=100)
    view_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.CharField(max_length=1)

    class Meta:
        db_table = 'product'


class ProductImage(models.Model):
    product_id = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    image_src = models.ImageField(max_length=255, upload_to="product/%Y/%m/%d")

    class Meta:
        db_table = 'product_image'


class ProductActive(Enum):
    ACTIVE = '활성화'
    INACTIVE = '비활성화'


class ProductOption(models.Model):
    product_id = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    option_size = models.IntegerField()
    option_color = models.CharField(max_length=50)
    is_active = models.CharField(
        max_length=20,
        choices=[(status.value, status.name) for status in ProductActive], 
        default=ProductActive.ACTIVE.value
        )
    price = models.FloatField()
    delivery_fee = models.FloatField()
    quantity = models.IntegerField()

    class Meta:
        db_table = 'product_option'
    
    def __str__(self):
        return f'{self.option_size} {self.option_color}'

