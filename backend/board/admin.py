from django.contrib import admin
from .models import Question, Answer, QuestionImage, AnswerImage


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    pass


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass


@admin.register(QuestionImage)
class QuestionImageAdmin(admin.ModelAdmin):
    pass


@admin.register(AnswerImage)
class AnswerImageAdmin(admin.ModelAdmin):
    pass