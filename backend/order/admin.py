from django.contrib import admin
from .models import Cart, Order, OrderDetail


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    pass

