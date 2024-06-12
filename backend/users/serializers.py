# your_app/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user = UserModel.objects.create_user(**clean_data)
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ('password', 'groups', 'user_permissions', 'is_superuser', 'is_staff',)


class EmailIsAvailableSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def is_available(self, email):
        user = UserModel.objects.filter(email=email)
        return not user.exists()
