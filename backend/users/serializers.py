from rest_framework import serializers
from django.contrib.auth import get_user_model
from authentication.serializers import UserSerializer
from .models import StdUser

UserModel = get_user_model()


class StdUserSerializer(serializers.ModelSerializer):
    account = UserSerializer()

    class Meta:
        model = StdUser
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('account')
        user = UserModel.objects.create_user(**user_data)
        stdUser = StdUser.objects.create(account=user, **validated_data)
        return stdUser
    
    def update(self, instance, validated_data):
        instance.display_name = validated_data.get("display_name", instance.display_name)
        instance.country = validated_data.get("country", instance.country)
        instance.address = validated_data.get("address", instance.address)
        instance.save()
        return instance
