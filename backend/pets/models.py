from django.db import models
from shelters.models import Shelter

def upload_to(instance, filename):
    return f"pets/{instance.pet_id.shelter_id.account.email}/{filename}"
def upload_avatar(instance, filename):
    return f"pets/{instance.shelter_id.account.email}/{filename}"

class Pet(models.Model):
    # auto fields
    pet_id = models.AutoField(primary_key=True)
    date_added = models.DateTimeField(auto_now_add=True)
    shelter_id = models.ForeignKey(Shelter, related_name='pet', on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to=upload_avatar, null=True, blank=True)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20)
    breed = models.CharField(max_length=255, blank=True)
    age = models.IntegerField(blank=True)

    def __str__(self):
        return self.name


class PetImage(models.Model):
    pet_id = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=upload_to)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
