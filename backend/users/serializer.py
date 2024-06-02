# your_app/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterStepOneSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def create(self, validated_data):

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class RegisterStepTwoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'description', 'contact_email']

class RegisterStepThreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'country', 'street_required', 'street_optional', 'postcode',
            'city', 'state', 'country_code', 'phone_number'
        ]

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
