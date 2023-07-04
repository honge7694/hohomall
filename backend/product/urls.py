from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('edit/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-edt'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
]
