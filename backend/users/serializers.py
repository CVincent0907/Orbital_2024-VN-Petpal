from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import RestrictedError
from authentication.serializers import UserSerializer
from .models import StdUser
from addresses.models import Address
from addresses.serializers import AddressSerializer

UserModel = get_user_model()


class StdUserSerializer(serializers.ModelSerializer):
    account = UserSerializer()
    address = AddressSerializer(required=False, allow_null=True)
    profile_pic = serializers.ImageField(read_only=True)

    class Meta:
        model = StdUser
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('account')
        user = UserModel.objects.create_user(**user_data)
        address_data = validated_data.pop('address', None)
        if address_data:
            address = Address.objects.create(**address_data)
            stdUser = StdUser.objects.create(account=user, address=address, **validated_data)
        else:
            stdUser = StdUser.objects.create(account=user, **validated_data)
        return stdUser
    
    def update(self, instance, validated_data):
        instance.display_name = validated_data.get("display_name", instance.display_name)
        instance.country = validated_data.get("country", instance.country)
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


class StdUserProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = StdUser
        fields = ('profile_pic',)

    def update(self, instance, validated_data):
        instance.profile_pic = validated_data.get("profile_pic", instance.profile_pic)
        instance.save()
        return instance

