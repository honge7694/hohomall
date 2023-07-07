# Generated by Django 4.2.2 on 2023-07-03 00:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=500)),
                ('image_src', models.ImageField(blank=True, upload_to='coupons/%Y/%m/%d')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('is_active', models.CharField(default='Y', max_length=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('brand_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.brand')),
            ],
            options={
                'db_table': 'coupon',
            },
        ),
        migrations.CreateModel(
            name='CouponUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_used', models.CharField(choices=[('사용', 'USED'), ('미사용', 'NOT_USED')], default='미사용', max_length=10)),
                ('download_date', models.DateTimeField(auto_now_add=True)),
                ('use_date', models.DateTimeField(auto_now=True)),
                ('coupon_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coupon.coupon')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'coupon_user',
            },
        ),
    ]