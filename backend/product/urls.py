from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('detail/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
]
