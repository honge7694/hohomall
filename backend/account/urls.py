from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ( 
    SignupListCreateAPIView, 
    EmailVerificationAPIView,
    CustomTokenObtainPairView
)


urlpatterns = [
    path('signup/', SignupListCreateAPIView.as_view(), name='signup'),
    path('verify/', EmailVerificationAPIView.as_view(), name='verify-user'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]
