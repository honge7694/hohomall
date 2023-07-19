from rest_framework import serializers
from .models import Question, Answer, QuestionImage, AnswerImage


class QuestionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionImage
        fields = ['id', 'question', 'image_src']


class QuestionSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'subject', 'title', 'content', 'images', 'created_at', 'updated_at']

    def get_images(self, obj):
        image = obj.questionimage_set.all()
        return QuestionImageSerializer(instance=image, many=True).data

    def create(self, validated_data):
        instance = Question.objects.create(**validated_data)
        image_set = self.context['request'].FILES

        for image_data in image_set.getlist('images'):
            QuestionImage.objects.create(question=instance, image_src=image_data)

        return instance
    






