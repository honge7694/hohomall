from rest_framework import serializers
from .models import Review, ReviewImage
from account.serializers import UserInfoEditSerializer
from product.models import Product


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ['id', 'review_id', 'image_src']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserInfoEditSerializer(read_only=True)
    images = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'content', 'rating', 'images', 'created_at', 'updated_at']

    def get_images(self, obj):
        image = obj.reviewimage_set.all()
        return ReviewImageSerializer(instance=image, many=True, context=self.context).data
    

    def get_like(self, obj):
        like = obj.reviewlike_set.all()
        return len(like)
    
    def create(self, validated_data):
        instance = Review.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        
        for image_data in image_set.getlist('images'):
            ReviewImage.objects.create(review_id=instance, image_src=image_data)
        return instance