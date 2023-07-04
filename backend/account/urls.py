from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ( 
    SignupListCreateAPIView, 
    EmailVerificationAPIView,
    CustomTokenObtainPairView,
    UserInfoRetrieveUpdateDestroyAPIView,
    UserPasswordRetrieveUpdateDestroyAPIView,
    RecentListCreateAPIView,
)


urlpatterns = [
    path('signup/', SignupListCreateAPIView.as_view(), name='signup'),
    path('verify/', EmailVerificationAPIView.as_view(), name='verify-user'),
    path('recent/viewed/', RecentListCreateAPIView.as_view(), name='recent-viewed'),
    path('info/<int:pk>/', UserInfoRetrieveUpdateDestroyAPIView.as_view(), name='user-info'),
    path('info/password/<int:pk>/', UserPasswordRetrieveUpdateDestroyAPIView.as_view(), name='user-edit-password'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]
