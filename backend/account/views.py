from rest_framework import status
from rest_framework.generics import ListCreateAPIView, GenericAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core import signing
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.utils import timezone
from django.contrib.auth.hashers import check_password
from product.models import Product
from .serializers import SignupSerializer, CustomTokenObtainPairSerializer, UserInfoEditSerializer, UserPasswordEditSerializer, RecentViewedSerializer, UserDeleteSerializer
from .models import EmailVerificationStatus, RecentViewed
from datetime import timedelta


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

        # 프론트엔드 페이지로 리다이렉트
        redirect_url = settings.FRONTEND_URL
        return redirect(redirect_url)


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
    

class RecentListCreateAPIView(ListCreateAPIView):
    """
    최근 조회 목록
    """
    queryset = RecentViewed.objects.all()
    serializer_class = RecentViewedSerializer

    def get_queryset(self):
        timesince = timezone.now() - timedelta(days=1)
        qs = super().get_queryset()
        qs = qs.filter(user_id=self.request.user)
        qs = qs.filter(created_at__gte=timesince)
        return qs
    
    def perform_create(self, serializer):
        user = self.request.user

        # 중복으로 본 최근 상품
        product_id = self.request.data.get('product_id')
        product = get_object_or_404(Product, id=product_id)
        
        if RecentViewed.objects.filter(user_id=user, product_id=product).exists():
            # 최근 본 상품이 있다면 삭제
            RecentViewed.objects.filter(user_id=user, product_id=product).delete()
        
        serializer.save(user_id=user)
        return super().perform_create(serializer)
    

class UserDeleteAPIView(RetrieveUpdateDestroyAPIView):
    """
    회원 탈퇴
    """
    queryset = User.objects.all()
    serializer_class = UserDeleteSerializer

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        current_password = self.request.data.get('current_password')
        # print('current_password : ', current_password)

        # 입력한 비밀번호와 현재 비밀번호 일치 여부 확인
        if not check_password(current_password, user.password):
            return Response({"error": "현재 비밀번호가 일치하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        # 회원 정보 삭제
        user.delete()

        return Response({"message": "회원 탈퇴가 완료되었습니다."}, status=status.HTTP_200_OK)



