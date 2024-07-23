# Generated by Django 5.0.6 on 2024-07-23 05:28

import pets.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pets', '0004_pet_avatar_petimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=pets.models.upload_avatar),
        ),
    ]
