from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Pet

UserModel = get_user_model()


#TODO: Create, read, update, delete
class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'
