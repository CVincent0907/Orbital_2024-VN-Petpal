# Generated by Django 5.0.6 on 2024-06-25 04:57

import django.db.models.deletion
import pets.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pets', '0003_alter_pet_age_alter_pet_breed'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=pets.models.upload_to),
        ),
        migrations.CreateModel(
            name='PetImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=pets.models.upload_to)),
                ('description', models.TextField(blank=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('pet_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='pets.pet')),
            ],
        ),
    ]
