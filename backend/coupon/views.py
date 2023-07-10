from rest_framework.generics import ListCreateAPIView
from .models import Coupon, CouponUser, CouponStatus
from .serializers import CouponSerializer, CouponUserSerializer


class CouponListCreateAPIView(ListCreateAPIView):
    """
    쿠폰 생성 및 목록
    """
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer


class CouponUserListCreateAPIView(ListCreateAPIView):
    """
    유저 쿠폰 등록 및 목록
    """
    serializer_class = CouponUserSerializer

    def get_queryset(self):
        user = self.request.user
        qs = CouponUser.objects.filter(is_used=CouponStatus.NOT_USED.value)
        qs = qs.filter(user_id=user)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user_id=user)
        return super().perform_create(serializer)
