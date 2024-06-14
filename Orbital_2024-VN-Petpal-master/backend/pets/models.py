from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class Pet(models.Model):
    # auto fields
    pet_id = models.AutoField(primary_key=True)
    date_added = models.DateTimeField(auto_now_add=True)
    shelter_id = models.ForeignKey(UserModel, related_name='shelter_id', on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20)
    breed = models.CharField(max_length=200)
    age = models.IntegerField()

    def __str__(self):
        return self.name
