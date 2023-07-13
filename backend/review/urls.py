from django.urls import path
from .views import ReviewListCreateAPIView, ReviewLikeListCreateAPIView


urlpatterns = [
    path('', ReviewListCreateAPIView.as_view(), name='review-list'),
    path('like/<int:pk>/', ReviewLikeListCreateAPIView.as_view(), name='review-like'),
]
