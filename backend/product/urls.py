from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, ProductDataListRetrieveAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('type/', ProductDataListRetrieveAPIView.as_view(), name='product-type'),
    path('detail/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
]
