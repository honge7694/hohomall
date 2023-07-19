from rest_framework import serializers
from .models import Question, Answer, QuestionImage, AnswerImage
from account.serializers import UserInfoEditSerializer


class QuestionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionImage
        fields = ['id', 'question', 'image_src']


class QuestionSerializer(serializers.ModelSerializer):
    user = UserInfoEditSerializer(source='user_id')
    images = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'user', 'subject', 'title', 'content', 'images', 'created_at', 'updated_at']

    def get_images(self, obj):
        image = obj.questionimage_set.all()
        return QuestionImageSerializer(instance=image, many=True).data

    def create(self, validated_data):
        instance = Question.objects.create(**validated_data)
        image_set = self.context['request'].FILES

        for image_data in image_set.getlist('images'):
            QuestionImage.objects.create(question=instance, image_src=image_data)

        return instance


class AnswerImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerImage
        fields = ['id', 'answer', 'image_src']


class AnswerSerializer(serializers.ModelSerializer):
    admin = UserInfoEditSerializer(read_only=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = ['id', 'question_id', 'admin', 'title', 'content', 'images', 'created_at']

    def get_images(self, obj):
        image = obj.answerimage_set.all()
        return AnswerImageSerializer(instance=image, many=True).data

    def create(self, validated_data):
        question_id = self.context['request'].data.get('question_id')  # question_id 받기
        instance = Answer.objects.create(question_id=question_id, **validated_data)
        image_set = self.context['request'].FILES

        for image_data in image_set.getlist('images'):
            AnswerImage.objects.create(answer=instance, image_src=image_data)

        return instance
    






