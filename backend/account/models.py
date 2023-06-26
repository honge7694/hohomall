from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from enum import Enum 


class UserManager(BaseUserManager):
    def create_user(self, email, nickname, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
            nickname='super'
        )
        user.is_admin = True
        user.status = EmailVerificationStatus.VERIFIED.value
        user.save(using=self._db)
        return user


class EmailVerificationStatus(Enum):
    VERIFIED = '인증'
    UNVERIFIED = '미인증'


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    password = models.CharField(max_length=100)
    nickname = models.CharField(max_length=100)
    image_src = models.ImageField(upload_to="account/%Y/%m/%d", default='media/default_image.png')
    status = models.CharField(
            max_length=20, 
            choices=[(status.value, status.name) for status in EmailVerificationStatus], 
            default=EmailVerificationStatus.UNVERIFIED.value
        )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'account'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin