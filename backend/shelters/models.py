from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class Shelter(models.Model):
    shelter_id = models.AutoField(primary_key=True)
    account = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name="shelter_data")
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    
    country = models.CharField(max_length=255, blank=True)
    street_1 = models.CharField(max_length=255, blank=True)
    street_2 = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Shelter" + self.shelter_id
