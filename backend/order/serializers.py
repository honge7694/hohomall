from rest_framework import serializers
from .models import Cart
from product.models import Product, ProductOption, ProductImage
from product.serializers import ProductImageSerializer


class CartSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
    )
    product_option_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductOption.objects.all(),
        write_only=True,
    )
    product = serializers.SerializerMethodField(read_only=True)
    product_option = serializers.SerializerMethodField(read_only=True)
    product_image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'product_id', 'product', 'product_option_id', 'product_option', 'product_image', 'price', 'quantity']

    def get_product(self, obj):
        product = obj.product_id
        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'view_count': product.view_count,
        }

        return product_data
    
    def get_product_option(self, obj):
        product_option = obj.product_option_id
        product_option_data = {
            'id': product_option.id,
            'option_size': product_option.option_size,
            'option_color': product_option.option_color,
            'price': product_option.price,
            'delivery_fee': product_option.delivery_fee,
            'quantity': product_option.quantity,
        }
        return product_option_data
    
    def get_product_image(self, obj):
        product = obj.product_id
        try:
            # Assuming there is only one image associated with the product
            image = product.productimage_set.first()
            if image:
                return image.image_src.url
        except ProductImage.DoesNotExist:
            pass
        return None