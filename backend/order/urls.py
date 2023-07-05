from django.urls import path
from .views import CartListCreateAPIView


urlpatterns = [
    path('cart/', CartListCreateAPIView.as_view(), name='cart-list'),
]
