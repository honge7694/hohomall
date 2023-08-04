from rest_framework.filters import SearchFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import BrandSerializer, ProductSerializer
from .models import Brand, Product
from django.db.models import Q


class BrandListCreateAPIView(ListCreateAPIView):
    """
    브랜드 생성 및 리스트
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class BrandProductListAPIView(ListAPIView):
    """
    브랜드 상품 리스트
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        brand_id = self.request.query_params.get('brand_id')
        qs = super().get_queryset()
        qs = qs.filter(brand_id=brand_id)
        return qs


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
    

class ProductTypeDataListRetrieveAPIView(ListAPIView):
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


class ProductSubTypeDataListRetrieveAPIView(ListAPIView):
    """
    Product subtype 조회
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['product_subtype']

    def get_queryset(self):
        qs = super().get_queryset()
        subtype_param = self.request.query_params.get('subtype')
        if subtype_param:
            print(subtype_param)
            qs = qs.filter(product_subtype=subtype_param)
            print(qs)
        return qs
    

class SearchListAPIView(ListAPIView):
    """
    Product Search 
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        search_query = self.request.query_params.get('search')
        qs = super().get_queryset()
        qs = qs.filter(Q(name__icontains=search_query) | 
                    Q(product_type__icontains=search_query) | 
                    Q(product_subtype__icontains=search_query) | 
                    Q(product_style__icontains=search_query))
        return qs