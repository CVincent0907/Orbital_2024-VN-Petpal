# Generated by Django 5.0.6 on 2024-06-19 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_number', models.CharField(blank=True, max_length=20)),
                ('street_name', models.CharField(blank=True, max_length=255)),
                ('address_line_1', models.CharField(blank=True, max_length=255)),
                ('address_line_2', models.CharField(blank=True, max_length=255)),
                ('region', models.CharField(blank=True, max_length=255)),
                ('postcode', models.CharField(blank=True, max_length=20)),
                ('city', models.CharField(blank=True, max_length=255)),
                ('state', models.CharField(blank=True, max_length=255)),
                ('country', models.CharField(max_length=3)),
            ],
        ),
    ]
