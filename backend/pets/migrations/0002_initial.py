# Generated by Django 5.0.6 on 2024-06-13 09:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pets', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='shelter_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shelter_id', to=settings.AUTH_USER_MODEL),
        ),
    ]
