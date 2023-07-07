from django.urls import path
from .views import CartListCreateAPIView, CartRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('cart/', CartListCreateAPIView.as_view(), name='cart-list'),
    path('cart/detail/<int:pk>/', CartRetrieveUpdateDestroyAPIView.as_view(), name='cart-detail'),
]
