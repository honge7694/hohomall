from rest_framework import serializers
from .models import Cart
from product.models import Product, ProductOption
from product.serializers import ProductSerializer


class CartSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
    )
    product_option_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductOption.objects.all(),
        write_only=True,
    )
    product = ProductSerializer(read_only=True, source='product_id')

    class Meta:
        model = Cart
        fields = ['id', 'product_id', 'product', 'product_option_id', 'price', 'quantity']