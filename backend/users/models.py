from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class StdUser(models.Model):
    TYPE_CHOICES = {
        "DOG": "dog",
        "CAT": "cat",
    }

    user_id = models.AutoField(primary_key=True)
    account = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name="user_data")
    display_name = models.CharField(max_length=255, blank=False)
    country = models.CharField(max_length=255, blank=True)
    #TODO: create separate model for addresses
    address = models.CharField(max_length=255, blank=True)
    #TODO: create seperate model for pet types
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "User" + self.user_id
