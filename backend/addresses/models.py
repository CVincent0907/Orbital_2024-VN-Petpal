from django.db import models
import os
from dotenv import load_dotenv
import requests

load_dotenv()

class AddressManager(models.Manager):
    def create(self, **kwargs):
        API_KEY = os.getenv("GEOCODING_API_KEY")
        address = Address(**kwargs)
        address_text = address.__str__()
        params = {
            'key': API_KEY,
            'address': address_text
        }
        response = requests.get(f"https://maps.googleapis.com/maps/api/geocode/json", params=params).json()
        if response['results']:
            lat = response['results'][0]['geometry']['location']['lat']
            lng = response['results'][0]['geometry']['location']['lng']
            address.lat = lat
            address.lng = lng
            address.is_valid = True
        else:
            address.is_valid = False
        address.save()
        return address

class Address(models.Model):
    address_line_1 = models.CharField(max_length=255, blank=True)
    address_line_2 = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=31, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=3)
    lat = models.FloatField(default=0.0)
    lng = models.FloatField(default=0.0)
    is_valid = models.BooleanField(default=False)

    objects = AddressManager()

    def __str__(self):
        return (self.address_line_1 + (self.address_line_1 and "," or "") + 
                self.address_line_2 + (self.address_line_2 and "," or "") + 
                self.postcode + self.city + ((self.postcode or self.city) and "," or "") +
                self.country)
