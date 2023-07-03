from django.urls import path
from .views import CouponListCreateAPIView, CouponUserListCreateAPIView

urlpatterns = [
    path('', CouponListCreateAPIView.as_view(), name='coupon'),
    path('user/', CouponUserListCreateAPIView.as_view(), name='coupon_user'),
]
