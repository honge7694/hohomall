from rest_framework import status
from rest_framework.generics import ListCreateAPIView, GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core import signing
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from .serializers import SignupSerializer, CustomTokenObtainPairSerializer, UserInfoEditSerializer, UserPasswordEditSerializer
from .models import EmailVerificationStatus


User = get_user_model()


class UserInfoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    유저 정보 및 수정
    """
    queryset = User.objects.all()
    serializer_class = UserInfoEditSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs.filter(id=self.request.user.id)
        return qs
    

class UserPasswordRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    유저 패스워드 수정
    """
    queryset = User.objects.all()
    serializer_class = UserPasswordEditSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs.filter(id=self.request.user.id)
        return qs
    
    def perform_update(self, serializer):
        current_password = self.request.data['current_password']
        if not self.request.user.check_password(current_password):
            return Response({'detail': '인증정보가 유효하지 않습니다.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return super().perform_update(serializer)



class SignupListCreateAPIView(ListCreateAPIView):
    """
    유저 회원가입
    """
    queryset = User.objects.all()
    serializer_class = SignupSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_email_verification(instance)
        return instance
    
    def send_email_verification(self, user):
        """
        이메일 인증 링크(get_verification_link)를 포함한 인증 이메일 발송
        """
        subject = "이메일 인증을 완료해주세요."
        message = f'<p>{user.nickname}님, 아래 링크를 클릭하여 회원가입을 완료해주세요.</p>\n\n\n'
        message += f'<p><a href="{self.get_verification_link(user)}">인증 링크</a></p>'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        
        email = EmailMessage(subject, message, from_email, recipient_list)
        email.content_subtype = 'html'
        email.send()

    def get_verification_link(self, user):
        """
        이메일 인증 링크 생성
        """
        verification_token = signing.dumps({'user_id': user.id})
        # TODO: 이메일 인증 링크 변경 필요.
        return f'{settings.HOST_NAME}/account/verify/?token={verification_token}'


class EmailVerificationAPIView(GenericAPIView):
    """
    이메일 인증 API
    """
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')

        try:
            user_id = signing.loads(token)['user_id']
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'detail': '인증정보가 유효하지않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        user.status = EmailVerificationStatus.VERIFIED.value
        user.save()

        return Response({'detail': '이메일 인증이 완료되었습니다.'}, status=status.HTTP_200_OK)
        # TODO: 프론트엔드 페이지로 리다이렉트
        # redirect_url = reverse('frontend-page')
        # return redirect(redirect_url)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    유저 로그인
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = response.data.get('user')
            if not user.get('status') == EmailVerificationStatus.VERIFIED.value:
                raise AuthenticationFailed('이메일 인증이 필요합니다.')
        
        return response
    




