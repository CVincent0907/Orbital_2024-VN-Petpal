from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions, status

from .serializers import PetSerializer, PetImageSerializer
from .models import Pet, PetImage
from authentication.permissions import IsShelter


class PetCreate(APIView):
    permission_classes = (permissions.IsAuthenticated, IsShelter,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request):
        data = request.data.copy()
        data['shelter_id'] = request.user.shelter_data.shelter_id
        serializer = PetSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class PetDetail(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, pk):
        try:
            pet = Pet.objects.get(pk=pk)
        except (Pet.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if pet:
            serializer = PetSerializer(pet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class PetList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, shelter_id=None):
        if shelter_id:
            queryset = Pet.objects.filter(shelter_id=shelter_id)
        else:
            queryset = Pet.objects.all()
        serializer = PetSerializer(queryset, many=True)
        return Response({'pets': serializer.data}, status=status.HTTP_200_OK)


class PetUpdate(APIView):
    permission_classes = (permissions.AllowAny,)
    permission_classes = (permissions.IsAuthenticated, IsShelter,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser,)

    def put(self, request, pk):
        try:
            pet = Pet.objects.get(pk=pk)
        except (Pet.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if pet.shelter_id == request.user.shelter_data:
            data = request.data
            serializer = PetSerializer(instance=pet, data=data, partial=True)
            if pet and serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)


class PetDelete(APIView):
    permission_classes = (permissions.IsAuthenticated, IsShelter)
    authentication_classes = (SessionAuthentication,)

    def delete(self, request, pk):
        try:
            pet = Pet.objects.get(pk=pk)
        except (Pet.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if pet.shelter_id == request.user.shelter_data:
            pet.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)
    

class PetAddPhoto(APIView):
    permission_classes = (permissions.IsAuthenticated, IsShelter)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, pet_id, format=None):
        try:
            pet = Pet.objects.get(pk=pet_id)
        except (Pet.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if pet.shelter_id != request.user.shelter_data:
            return Response(status=status.HTTP_403_FORBIDDEN)
        request.data['pet_id'] = pet.pet_id
        serializer = PetImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class PetRemovePhoto(APIView):
    permission_classes = (permissions.IsAuthenticated, IsShelter)
    authentication_classes = (SessionAuthentication,)

    def delete(self, request, pk):
        try:
            image = PetImage.objects.get(pk=pk)
        except (PetImage.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if image.pet_id.shelter_id == request.user.shelter_data:
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)
