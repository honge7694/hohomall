from django.contrib import admin
from .models import User, RecentViewed


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(RecentViewed)
class RecentViewedAdmin(admin.ModelAdmin):
    pass