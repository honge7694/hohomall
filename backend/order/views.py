from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Cart, Order, Purchase
from .serializers import CartSerializer, OrderSerializer, PurchaseSerializer
from django.db.models import F
from product.models import Product


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
        print(cart_item)
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


class OrderListCreateAPIView(ListCreateAPIView):
    """
    주문 생성 및 리스트 API
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user_id=self.request.user)
        return qs
        
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user_id=user)
        return super().perform_create(serializer)
    

class OrderRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    주문 detail API
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class PurchaseListCreateAPIView(ListCreateAPIView):
    """
    구매 기록 생성 및 리스트 API (Review 작성 가능 여부)
    """
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        user = self.request.user
        product_id = self.request.query_params.get('product_id')
        qs = super().get_queryset()
        qs = qs.filter(user_id=user, product_id=product_id)
        return qs
    
    # def post(self, request, *args, **kwargs):
    #     data = self.request.data
    #     print("data : ", data)
    #     products = request.data.get('products')

    #     for product in products:
    #         # product_id = product.get('product_id')
    #         product_id = product['product_id']  # 수정된 부분
    #         product_pk = Product.objects.filter(id=product_id).first()
    #         purchase = Purchase.objects.create(user_id=request.user, product_id=product_pk)
    #     return super().post(request, *args, **kwargs)
    
    # def perform_create(self, serializer):
    #     user = self.request.user
    #     serializer.save(user_id=user)
    #     return super().perform_create(serializer)


class AdminOrderListAPIView(ListAPIView):
    """
    Admin OrderList
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer