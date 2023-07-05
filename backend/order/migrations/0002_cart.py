# Generated by Django 4.2.2 on 2023-07-05 09:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0002_product_price_product_view_count'),
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('product_option_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.productoption')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
