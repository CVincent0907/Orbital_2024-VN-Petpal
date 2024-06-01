# your_app/views.py
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from .serializer import RegisterStepOneSerializer, RegisterStepTwoSerializer, RegisterStepThreeSerializer
from django.contrib.auth import login, logout, get_user_model
from rest_framework.authentication import SessionAuthentication
# from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

UserModel = get_user_model()


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # TODO: create validations to cleanup data
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.create(clean_data=data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        # TODO: create validations to cleanup data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def temporary_home(request):
#     return HttpResponse("Welcome to the temporary home page!")

# @csrf_exempt
# @api_view(['POST'])
# def register_step_one(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = RegisterStepOneSerializer(data=data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return JsonResponse({'message': 'Step one complete', 'user_id': user.id}, status=201)
#         return JsonResponse(serializer.errors, status=400)

# @csrf_exempt
# @api_view(['POST'])
# def register_step_two(request):
#     if request.method == 'POST':
#         try:
#             data = JSONParser().parse(request)
#         except Exception as e:
#             error_message = str(e)
#             return JsonResponse({'error': 'Failed to parse JSON data', 'detail:': error_message}, status=400)
        
#         user_id = data.get('user_id')
#         if user_id is None:
#             return JsonResponse({'error': 'Missing user_id in request data'}, status=400)

#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
        
#         serializer = RegisterStepTwoSerializer(user, data=data, partial=True)
#         try:
#             if serializer.is_valid():
#                 serializer.save()
#                 return JsonResponse({'message': 'Step two complete'}, status=200)
#             else:
#                 return JsonResponse(serializer.errors, status=400)
#         except ValidationError as e:
#             return JsonResponse({'error': str(e)}, status=400)


# @csrf_exempt
# @api_view(['POST'])
# def register_step_three(request):
#     if request.method == 'POST':
#         try:
#             data = JSONParser().parse(request)
#         except Exception as e:
#             error_message = str(e)
#             return JsonResponse({'error': 'Failed to parse JSON data', 'detail': error_message}, status=400)

#         user_id = data.get('user_id')
#         if not user_id:
#             return JsonResponse({'error': 'Missing user_id in request data'}, status=400)

#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)

#         serializer = RegisterStepThreeSerializer(user, data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse({'message': 'Step three complete'}, status=200)
#         else:
#             return JsonResponse(serializer.errors, status=400)
