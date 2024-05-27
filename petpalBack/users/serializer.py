from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'description', 'contact_email', 'country', 'street', 'optional_street', 'postcode', 'city', 'state', 'telephone_country_code', 'phone_number']
