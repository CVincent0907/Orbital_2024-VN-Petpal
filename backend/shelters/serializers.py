from rest_framework import serializers
from django.contrib.auth import get_user_model
from authentication.serializers import UserSerializer
from .models import Shelter

UserModel = get_user_model()


class ShelterSerializer(serializers.ModelSerializer):
    account = UserSerializer()

    class Meta:
        model = Shelter
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('account')
        user = UserModel.objects.create_user(**user_data)
        shelter = Shelter.objects.create(account=user, **validated_data)
        return shelter
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.contact_email = validated_data.get("contact_email", instance.contact_email)
        # Address fields, to be updated
        instance.country = validated_data.get("country", instance.country)
        instance.street_1 = validated_data.get("street_1", instance.street_1)
        instance.street_2 = validated_data.get("street_2", instance.street_2)
        instance.postcode = validated_data.get("postcode", instance.postcode)
        instance.city = validated_data.get("city", instance.city)
        instance.state = validated_data.get("state", instance.state)
        instance.phone_number = validated_data.get("phone_number", instance.phone_number)
        instance.save()
        return instance
