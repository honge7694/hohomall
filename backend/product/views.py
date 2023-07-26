from rest_framework.filters import SearchFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import BrandSerializer, ProductSerializer
from .models import Brand, Product


class BrandListCreateAPIView(ListCreateAPIView):
    """
    브랜드 생성 및 리스트
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class ProductListCreateAPIView(ListCreateAPIView):
    """
    상품 생성 및 리스트
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    상품 조회 및 수정, 삭제
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_count += 1
        instance.save()
        return super().retrieve(request, *args, **kwargs)
    

class ProductDataListRetrieveAPIView(ListAPIView):
    """
    상품 type 조회
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['product_type']

    def get_queryset(self):
        qs = super().get_queryset()
        type_param = self.request.query_params.get('type')
        if type_param:
            print(type_param)
            qs = qs.filter(product_type=type_param)
            print(qs)
        return qs
