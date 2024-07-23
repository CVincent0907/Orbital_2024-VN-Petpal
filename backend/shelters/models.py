from django.db import models
from django.contrib.auth import get_user_model
from shortuuid.django_fields import ShortUUIDField
from addresses.models import Address

UserModel = get_user_model()
def upload_to(instance, filename):
    return f"shelters/{instance.account.email}/{filename}"
def upload_images(instance, filename):
    return f"shelters/{instance.shelter_id.account.email}/{filename}"

class Shelter(models.Model):
    # TODO: add link field
    shelter_id = ShortUUIDField(primary_key=True, length=15)
    account = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name="shelter_data")
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
    profile_pic = models.ImageField(upload_to=upload_to, null=True, blank=True)
    contact_email = models.EmailField(blank=True)
    
    country = models.CharField(max_length=255, blank=True)
    address = models.ForeignKey(Address, on_delete=models.RESTRICT, null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Shelter" + self.shelter_id


class ShelterImage(models.Model):
    shelter_id = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=upload_images)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
