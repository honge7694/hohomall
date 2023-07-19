from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product
from enum import Enum


User = get_user_model()


class SubjectChoice(Enum):
    DELIVERY = '배송문의'
    PRODUCT = '상품문의'
    PAYMENT = '결제문의'
    ETC = '기타문의'


class Question(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(
        max_length=20, 
        choices=[(subject.value, subject.name) for subject in SubjectChoice], 
        default=SubjectChoice.ETC.value
    )
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'question'
        ordering = ['-id']


class QuestionImage(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    image_src = models.ImageField(blank=True, upload_to="question/%Y/%m/%d")

    class Meta:
        db_table = 'question_image'


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'answer'
        ordering = ['-id']


class AnswerImage(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    image_src = models.ImageField(blank=True, upload_to="question/%Y/%m/%d")

    class Meta:
        db_table = 'answer_image'
