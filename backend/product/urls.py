from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, ProductTypeDataListRetrieveAPIView, ProductSubTypeDataListRetrieveAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('type/', ProductTypeDataListRetrieveAPIView.as_view(), name='product-type'),
    path('subtype/', ProductSubTypeDataListRetrieveAPIView.as_view(), name='product-subtype'),
    path('detail/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
]
