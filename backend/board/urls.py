from django.urls import path
from .views import QuestionListCreateAPIView, AnswerListCreateAPIView, QuestionRetrieveUpdateDestroyAPIView, AnswerRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('question/', QuestionListCreateAPIView.as_view(), name='question-list'),
    path('question/detail/<int:pk>/', QuestionRetrieveUpdateDestroyAPIView.as_view(), name='question-detail'),
    path('answer/', AnswerListCreateAPIView.as_view(), name='answer-list'),
    path('answer/detail/<int:pk>/', AnswerRetrieveUpdateDestroyAPIView.as_view(), name='question-detail'),
]
