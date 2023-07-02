# Generated by Django 4.2.2 on 2023-07-02 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email')),
                ('password', models.CharField(max_length=100)),
                ('nickname', models.CharField(max_length=100)),
                ('image_src', models.ImageField(default='default_image.png', upload_to='account/%Y/%m/%d')),
                ('status', models.CharField(choices=[('인증', 'VERIFIED'), ('미인증', 'UNVERIFIED')], default='미인증', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'account',
            },
        ),
    ]
