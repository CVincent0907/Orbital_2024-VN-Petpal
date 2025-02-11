# Generated by Django 5.0.6 on 2024-07-23 13:23

import shortuuid.django_fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shelters', '0005_alter_shelterimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shelter',
            name='shelter_id',
            field=shortuuid.django_fields.ShortUUIDField(alphabet=None, length=15, max_length=15, prefix='', primary_key=True, serialize=False),
        ),
    ]
