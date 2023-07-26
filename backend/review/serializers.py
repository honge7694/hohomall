from rest_framework import serializers
from .models import Review, ReviewImage, ReviewLike
from account.serializers import UserInfoEditSerializer
from product.serializers import ProductSerializer
from product.models import Product
import json


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ['id', 'review_id', 'image_src']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserInfoEditSerializer(source='user_id', read_only=True)
    product = ProductSerializer(source='product_id', read_only=True)
    images = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'content', 'rating', 'like', 'is_like', 'images', 'created_at', 'updated_at']

    def get_images(self, obj):
        image = obj.reviewimage_set.all()
        return ReviewImageSerializer(instance=image, many=True, context=self.context).data
    
    def get_like(self, obj):
        like = obj.reviewlike_set.all()
        return len(like)
    
    def get_is_like(self, obj):
        user = self.context['request'].user
        if not user.is_anonymous:
            return obj.reviewlike_set.filter(user_id=user).exists()
        return None
        
    def create(self, validated_data):
        instance = Review.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        
        for image_data in image_set.getlist('images'):
            ReviewImage.objects.create(review_id=instance, image_src=image_data)
        return instance

    def update(self, instance, validated_data):
        deleted_images_str = self.context['request'].data.get('deleted_images', '[]')
        deleted_images = json.loads(deleted_images_str)
        new_images = self.context['request'].FILES
        print("new_images : ", new_images)

        # 이미지 삭제 처리
        for image_id in deleted_images:
            print(image_id)
            instance.reviewimage_set.filter(id=image_id).delete()

        # 새로운 이미지 추가 처리
        for image_data in new_images.getlist('new_images'):
            ReviewImage.objects.create(review_id=instance, image_src=image_data)

        # Review 모델의 필드 업데이트
        instance.content = validated_data.get('content', instance.content)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()

        return instance
    

class ReviewLikeSerializer(serializers.ModelSerializer):
    user = UserInfoEditSerializer(source='user_id', read_only=True)
    review = ReviewSerializer(source='review_id', read_only=True)

    class Meta:
        model = ReviewLike
        fields = ['id', 'user', 'review']