from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'nickname', 'image_src', 'status']

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            nickname=validated_data['nickname'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            "id": self.user.id,
            "nickname": self.user.nickname,
            "status": self.user.status,
        }
        return data
