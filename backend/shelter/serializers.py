from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
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
