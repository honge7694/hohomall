from rest_framework.generics import ListCreateAPIView
from .models import Review
from .serializers import ReviewSerializer
from product.models import Product


class ReviewListCreateAPIView(ListCreateAPIView):
    """
    Product Review 생성 및 리스트
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(product_id=self.request.query_params.get('product_id'))
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        product_id = self.request.query_params.get('product_id')
        product = Product.objects.filter(id=product_id).first()
        serializer.save(user_id=user, product_id=product)
        return super().perform_create(serializer)

