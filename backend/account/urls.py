from django.urls import path
from .views import SignupListCreateAPIView, EmailVerificationAPIView


urlpatterns = [
    path('signup/', SignupListCreateAPIView.as_view(), name='signup'),
    path('verify/', EmailVerificationAPIView.as_view(), name='verify-user'),
]
