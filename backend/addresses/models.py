from django.db import models

class Address(models.Model):
    unit_number = models.CharField(max_length=20, blank=True)
    street_name = models.CharField(max_length=255, blank=True)
    address_line_1 = models.CharField(max_length=255, blank=True)
    address_line_2 = models.CharField(max_length=255, blank=True)
    region = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=3)
