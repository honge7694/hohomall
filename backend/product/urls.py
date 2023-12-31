from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, ProductTypeDataListRetrieveAPIView, ProductSubTypeDataListRetrieveAPIView, SearchListAPIView, BrandProductListAPIView, BrandRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('type/', ProductTypeDataListRetrieveAPIView.as_view(), name='product-type'),
    path('subtype/', ProductSubTypeDataListRetrieveAPIView.as_view(), name='product-subtype'),
    path('detail/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('search/', SearchListAPIView.as_view(), name='product-search'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
    path('brand/<int:pk>/', BrandRetrieveUpdateDestroyAPIView.as_view(), name='brand-detail'),
    path('brand/product/', BrandProductListAPIView.as_view(), name='brand-product'),
]
