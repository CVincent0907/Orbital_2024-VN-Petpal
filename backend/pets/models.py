from django.db import models
from shelters.models import Shelter

class Pet(models.Model):
    # auto fields
    pet_id = models.AutoField(primary_key=True)
    date_added = models.DateTimeField(auto_now_add=True)
    shelter_id = models.ForeignKey(Shelter, related_name='pet', on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20)
    breed = models.CharField(max_length=255, blank=True)
    age = models.IntegerField(blank=True)

    def __str__(self):
        return self.name
