from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import RecentViewed
from product.models import Product
from product.serializers import ProductSerializer


User = get_user_model()

class UserInfoEditSerializer(serializers.ModelSerializer):
    email = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'image_src']


class UserPasswordEditSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'current_password', 'password']

    def update(self, instance, validated_data):
        current_password = validated_data.pop('current_password', None)

        if current_password and instance.check_password(current_password):
            new_password = validated_data.get('password')
            instance.set_password(new_password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError("현재 비밀번호가 올바르지 않습니다.")


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    total_amount_used = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'nickname', 'image_src', 'status', 'total_amount_used', 'created_at']

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            nickname=validated_data['nickname'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    
    def get_total_amount_used(self, obj):
        user_order = obj.order_set.all()
        total_price = 0

        # 주문들을 순회하면서 user_id가 같은 주문들의 총 금액을 더함
        for order in user_order:
            print(str(order.user_id), obj.id, type(obj.email))
            if str(order.user_id) == obj.email:
                total_price += order.total_price

        return total_price


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            "id": self.user.id,
            "nickname": self.user.nickname,
            "status": self.user.status,
            "is_admin": self.user.is_admin,
        }
        return data


class RecentViewedSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
    )
    product = ProductSerializer(read_only=True, source='product_id')
    
    class Meta:
        model = RecentViewed
        fields = ['id', 'product_id', 'product', 'created_at']


class UserDeleteSerializer(serializers.ModelSerializer):
    # current_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id']