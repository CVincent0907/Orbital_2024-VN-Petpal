from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import PetSerializer
from .models import Pet
from authentication.permissions import IsShelter


class PetCreate(APIView):
    permission_classes = (permissions.IsAuthenticated, IsShelter,)
    authentication_classes = (SessionAuthentication,)
    # Create permission group for shelter

    def post(self, request):
        data = {'shelter': request.user.shelter_data.shelter_id, **request.data}
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
            queryset = Pet.objects.filter(shelter=shelter_id)
        else:
            queryset = Pet.objects.all()
        serializer = PetSerializer(queryset, many=True)
        return Response({'pets': serializer.data}, status=status.HTTP_200_OK)


class PetUpdate(APIView):
    permission_classes = (permissions.IsAuthenticated, IsShelter,)
    authentication_classes = (SessionAuthentication,)

    def put(self, request):
        try:
            pet = Pet.objects.get(pk=request.data['pet_id'])
        except (Pet.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if pet.shelter == request.user.shelter_data:
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

    def post(self, request, pk):
        try:
            pet = Pet.objects.get(pk=pk)
        except (Pet.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if pet.shelter == request.user.shelter_data:
            pet.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)