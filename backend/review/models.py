from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product


User = get_user_model()


class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    content = models.TextField()

    class Meta:
        db_table = 'review'
        ordering = ['-id']


class ReviewImage(models.Model):
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE)
    image_src = models.ImageField(blank=True, upload_to="coupons/%Y/%m/%d")

    class Meta:
        db_table = 'review_image'