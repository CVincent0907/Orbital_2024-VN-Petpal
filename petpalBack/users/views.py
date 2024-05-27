# Create your views here.
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializer import UserSerializer
from django.http import HttpResponse


@api_view(['POST'])
def register_step_one(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        
        form_data = {
            'email': email,
            'password': password,
        }

        serializer = UserSerializer(data=form_data)

        if serializer.is_valid():
            # Save the valid serializer data
            user = serializer.save()

            # Return user ID for the next step
            return Response({'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_step_two(request):
    if request.method == 'POST':
        # Extract data from request
        user_id = request.data.get('user_id')
        name = request.data.get('name')
        description = request.data.get('description')
        contact_email = request.data.get('contact_email')

        # Fetch user object or return 404 if not found
        user = get_object_or_404(User, id=user_id)

        # Update user fields and save
        user.name = name
        user.description = description
        user.contact_email = contact_email
        user.save()

        # Return success response
        return Response({'message': 'Step 2 completed'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_step_three(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        country = request.data.get('country')
        street = request.data.get('street')
        optional_street = request.data.get('optional_street')
        postcode = request.data.get('postcode')
        city = request.data.get('city')
        state = request.data.get('state')
        telephone_country_code = request.data.get('telephone_country_code')
        phone_number = request.data.get('phone_number')

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user.country = country
        user.street = street
        user.optional_street = optional_street
        user.postcode = postcode
        user.city = city
        user.state = state
        user.telephone_country_code = telephone_country_code
        user.phone_number = phone_number
        user.save()

        return Response({'message': 'Registration completed'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def temporary_home(request):
    return HttpResponse("Welcome to the temporary home page!")


