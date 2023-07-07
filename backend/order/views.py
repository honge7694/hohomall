from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Cart
from .serializers import CartSerializer
from django.db.models import F


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
        product_id = self.request.data['product_id']
        product_option_id = self.request.data['product_option_id']
        price = self.request.data['price']

        cart_item = self.queryset.filter(product_id=product_id, product_option_id=product_option_id, price=price).first()
        if cart_item:
            # 이미 존재하는 상품인 경우 quantity를 증가시킴
            cart_item.quantity = F('quantity') + 1
            cart_item.save()
            return 
        
        serializer.save(user_id=user)
        return super().perform_create(serializer)


class CartRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    장바구니 아이템 삭제
    """
    queryset = Cart.objects.all()
    serializer_class = CartSerializer