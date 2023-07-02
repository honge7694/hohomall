from django.contrib import admin
from .models import Product, ProductImage, Brand, ProductOption


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    pass

@admin.register(ProductOption)
class ProductOptionAdmin(admin.ModelAdmin):
    pass