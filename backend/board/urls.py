from django.urls import path
from .views import QuestionListCreateAPIView, AnswerListCreateAPIView

urlpatterns = [
    path('question/', QuestionListCreateAPIView.as_view(), name='question-list'),
    path('answer/', AnswerListCreateAPIView.as_view(), name='answer-list'),
]
