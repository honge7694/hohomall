from django.contrib import admin
from .models import Review, ReviewImage, ReviewLike


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    pass


@admin.register(ReviewImage)
class ReviewImageAdmin(admin.ModelAdmin):
    pass


@admin.register(ReviewLike)
class ReviewLikeAdmin(admin.ModelAdmin):
    pass