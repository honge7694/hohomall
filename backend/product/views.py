from rest_framework.generics import ListCreateAPIView
from .serializers import BrandSerializer, ProductSerializer
from .models import Brand, Product

class BrandListCreateAPIView(ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class ProductListCreateAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    