from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, ProductTypeDataListRetrieveAPIView, ProductSubTypeDataListRetrieveAPIView, SearchListAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('type/', ProductTypeDataListRetrieveAPIView.as_view(), name='product-type'),
    path('subtype/', ProductSubTypeDataListRetrieveAPIView.as_view(), name='product-subtype'),
    path('detail/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('search/', SearchListAPIView.as_view(), name='product-search'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
]
