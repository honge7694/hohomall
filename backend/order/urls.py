from django.urls import path
from .views import CartListCreateAPIView, CartRetrieveUpdateDestroyAPIView, OrderListCreateAPIView, PurchaseListCreateAPIView, OrderRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', OrderListCreateAPIView.as_view(), name='order-list'),
    path('detail/<int:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view(), name='order-detail'),
    path('cart/', CartListCreateAPIView.as_view(), name='cart-list'),
    path('cart/detail/<int:pk>/', CartRetrieveUpdateDestroyAPIView.as_view(), name='cart-detail'),
    path('purchase/', PurchaseListCreateAPIView.as_view(), name='purchase-list'),
]
