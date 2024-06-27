# from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status

from .serializers import ShelterSerializer, ShelterRegisterSerializer, ShelterProfilePicSerializer, ShelterImageSerializer
from .models import Shelter

class ShelterRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print(request.data)
        serializer = ShelterRegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ShelterUpdate(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def put(self, request):
        account = request.user
        shelter_id = account.shelter_data.shelter_id
        try:
            shelter = Shelter.objects.get(pk=shelter_id)
        except Shelter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ShelterSerializer(shelter, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ShelterList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = Shelter.objects.all()
        serializer = ShelterSerializer(queryset, many=True, context={'request': request})
        return Response({'shelters': serializer.data}, status=status.HTTP_200_OK)


class ShelterUploadProfilePic(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser,)

    def put(self, request, format=None):
        account = request.user
        shelter_id = account.shelter_data.shelter_id
        try:
            shelter = Shelter.objects.get(pk=shelter_id)
        except Shelter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ShelterProfilePicSerializer(shelter, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            shelter_serializer = ShelterSerializer(shelter, context={'request': request})
            return Response(shelter_serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ShelterUploadImage(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, format=None):
        account = request.user
        shelter_id = account.shelter_data.shelter_id
        request.data['shelter_id'] = shelter_id
        serializer = ShelterImageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
