from django.contrib import admin
from .models import Cart, Order, OrderDetail, Purchase, OrderStatus


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    pass


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderStatus)
class OrderStatusAdmin(admin.ModelAdmin):
    pass


