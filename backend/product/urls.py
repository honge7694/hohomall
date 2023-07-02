from django.urls import path
from .views import BrandListCreateAPIView, ProductListCreateAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product'),
    path('brand/', BrandListCreateAPIView.as_view(), name='brand'),
]
