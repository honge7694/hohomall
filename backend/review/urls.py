from django.urls import path
from .views import ReviewListCreateAPIView, ReviewLikeListCreateAPIView, ReviewRetrieveUpdateDestroyAPIView, ReviewListAPIView


urlpatterns = [
    path('', ReviewListCreateAPIView.as_view(), name='review-list'),
    path('detail/<int:pk>/', ReviewRetrieveUpdateDestroyAPIView.as_view(), name='review-detail'),
    path('like/<int:pk>/', ReviewLikeListCreateAPIView.as_view(), name='review-like'),
    path('list/', ReviewListAPIView.as_view(), name='review-write-list'),
]
