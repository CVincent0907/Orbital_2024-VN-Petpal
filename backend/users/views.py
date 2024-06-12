# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from .serializer import RegisterStepOneSerializer, RegisterStepTwoSerializer, RegisterStepThreeSerializer
from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
# from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, EmailIsAvailableSerializer

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # TODO: create validations to cleanup data
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
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


class EmailIsAvailable(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, email):
        serializer = EmailIsAvailableSerializer(email)
        
        is_available = serializer.is_available(email)
        return Response({'is_available': is_available}, status=status.HTTP_200_OK)
