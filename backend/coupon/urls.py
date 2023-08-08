from django.urls import path
from .views import CouponListCreateAPIView, CouponUserListCreateAPIView, CouponRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', CouponListCreateAPIView.as_view(), name='coupon'),
    path('<int:pk>/', CouponRetrieveUpdateDestroyAPIView.as_view(), name='coupon-detail'),
    path('user/', CouponUserListCreateAPIView.as_view(), name='coupon_user'),
]
