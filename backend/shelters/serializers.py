from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import RestrictedError
from authentication.serializers import UserSerializer
from .models import Shelter
from addresses.models import Address
from addresses.serializers import AddressSerializer

UserModel = get_user_model()


class ShelterSerializer(serializers.ModelSerializer):
    account = UserSerializer()
    address = AddressSerializer(required=False)

    class Meta:
        model = Shelter
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('account')
        user = UserModel.objects.create_user(**user_data)
        address_data = validated_data.pop('address', None)
        if address_data:
            address = Address.objects.create(**address_data)
            shelter = Shelter.objects.create(account=user, address=address, **validated_data)
        else:
            shelter = Shelter.objects.create(account=user, **validated_data)
        return shelter
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.contact_email = validated_data.get("contact_email", instance.contact_email)
        instance.country = validated_data.get("country", instance.country)
        instance.phone_number = validated_data.get("phone_number", instance.phone_number)
        old_address = instance.address
        new_address_data = validated_data.get("address", None)
        if new_address_data:
            new_address = Address.objects.create(**new_address_data)
            instance.address = new_address
            instance.save()
            try:
                old_address.delete()
            except RestrictedError:
                # Do nothing as the address is referenced by another account
                pass
        else:
            instance.save()
        return instance
