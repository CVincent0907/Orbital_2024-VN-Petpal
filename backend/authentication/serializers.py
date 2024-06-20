from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ('identifier', 'is_superuser', 'groups', 'user_permissions')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, clean_data):
        user = UserModel.objects.create_user(**clean_data)
        user.save()
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        extra_kwargs = {'password': {'write_only': True}}
    
    def check_user(self, clean_data):
        identifier = clean_data['role'][0].upper() + "#" + clean_data['email']
        user = authenticate(username=identifier, password=clean_data['password'])
        if not user:
            raise serializers.ValidationError('user not found')
        return user

class EmailIsAvailableSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.CharField()

    def is_available(self, email, role):
        identifier = role[0].upper() + "#" + email
        user = UserModel.objects.filter(identifier=identifier)
        return not user.exists()
