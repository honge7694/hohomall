# Generated by Django 4.2.2 on 2023-07-18 15:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_purchase'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ['-id']},
        ),
    ]