from rest_framework.generics import ListCreateAPIView
from .models import Cart
from .serializers import CartSerializer


class CartListCreateAPIView(ListCreateAPIView):
    """
    장바구니 생성 및 리스트
    """
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        qs.filter(user_id=user)
        return qs
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user_id=user)
        return super().perform_create(serializer)

