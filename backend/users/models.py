from django.db import models
from django.contrib.auth import get_user_model
from shortuuid.django_fields import ShortUUIDField
from addresses.models import Address

UserModel = get_user_model()
def upload_to(instance, filename):
    return f"users/{instance.account.email}/{filename}"

class StdUser(models.Model):
    user_id = ShortUUIDField(primary_key=True, length=15)
    account = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name="user_data")
    display_name = models.CharField(max_length=255, blank=False)
    profile_pic = models.ImageField(upload_to=upload_to, null=True, blank=True)
    country = models.CharField(max_length=255, blank=True)
    address = models.ForeignKey(Address, on_delete=models.RESTRICT, null=True, blank=True)
    #TODO: create seperate model for pet types
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "User" + self.user_id
