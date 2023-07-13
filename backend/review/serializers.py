from rest_framework import serializers
from .models import Review, ReviewImage, ReviewLike
from account.serializers import UserInfoEditSerializer
from product.models import Product


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ['id', 'review_id', 'image_src']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserInfoEditSerializer(source='user_id', read_only=True)
    images = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'content', 'rating', 'like', 'is_like', 'images', 'created_at', 'updated_at']

    def get_images(self, obj):
        image = obj.reviewimage_set.all()
        return ReviewImageSerializer(instance=image, many=True, context=self.context).data
    
    def get_like(self, obj):
        like = obj.reviewlike_set.all()
        return len(like)
    
    def get_is_like(self, obj):
        if 'request' in self.context and self.context['request'].user.is_authenticated:
            user = self.context['request'].user
            return obj.reviewlike_set.filter(user_id=user).exists()
        return None
        
    def create(self, validated_data):
        instance = Review.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        
        for image_data in image_set.getlist('images'):
            ReviewImage.objects.create(review_id=instance, image_src=image_data)
        return instance
    

class ReviewLikeSerializer(serializers.ModelSerializer):
    user = UserInfoEditSerializer(source='user_id', read_only=True)
    review = ReviewSerializer(source='review_id', read_only=True)

    class Meta:
        model = ReviewLike
        fields = ['id', 'user', 'review']