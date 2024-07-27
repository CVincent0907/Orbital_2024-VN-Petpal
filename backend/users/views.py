# from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status

from .serializers import StdUserSerializer, StdUserProfilePicSerializer
from .models import StdUser


class StdUserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = StdUserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class StdUserUpdate(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def put(self, request):
        account = request.user
        user_id = account.user_data.user_id
        try:
            user = StdUser.objects.get(pk=user_id)
        except StdUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = StdUserSerializer(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class StdUserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, q=None):
        if q:
            queryset = StdUser.objects.filter(display_name__startswith=q)
        else:
            queryset = StdUser.objects.all()
        serializer = StdUserSerializer(queryset, many=True, context={'request': request})
        return Response({'users': serializer.data}, status=status.HTTP_200_OK)


class StdUserUploadProfilePic(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser,)

    def put(self, request, format=None):
        account = request.user
        user_id = account.user_data.user_id
        try:
            user = StdUser.objects.get(pk=user_id)
        except StdUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = StdUserProfilePicSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            user_serializer = StdUserSerializer(user, context={'request': request})
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
