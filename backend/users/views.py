# your_app/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializer import RegisterStepOneSerializer, RegisterStepTwoSerializer, RegisterStepThreeSerializer
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from django.http import HttpResponse
from django.contrib.auth import authenticate
from .serializer import LoginSerializer

User = get_user_model()


@api_view(['GET'])
def temporary_home(request):
    return HttpResponse("Welcome to the temporary home page!")
    
@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            return JsonResponse({'success': True, 'message': 'Login successful'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid email or password'})
    return JsonResponse({'success': False, 'message': 'Invalid data', 'errors': serializer.errors})

@csrf_exempt
@api_view(['POST'])
def register_step_one(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RegisterStepOneSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return JsonResponse({'message': 'Step one complete', 'user_id': user.id}, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['POST'])
def register_step_two(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
        except Exception as e:
            error_message = str(e)
            return JsonResponse({'error': 'Failed to parse JSON data', 'detail:': error_message}, status=400)
        
        user_id = data.get('user_id')
        if user_id is None:
            return JsonResponse({'error': 'Missing user_id in request data'}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        
        serializer = RegisterStepTwoSerializer(user, data=data, partial=True)
        try:
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'Step two complete'}, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        except ValidationError as e:
            return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@api_view(['POST'])
def register_step_three(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
        except Exception as e:
            error_message = str(e)
            return JsonResponse({'error': 'Failed to parse JSON data', 'detail': error_message}, status=400)

        user_id = data.get('user_id')
        if not user_id:
            return JsonResponse({'error': 'Missing user_id in request data'}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        serializer = RegisterStepThreeSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Step three complete'}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
