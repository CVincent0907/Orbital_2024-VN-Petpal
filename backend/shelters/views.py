# from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status

from .serializers import ShelterSerializer
from .models import Shelter

class ShelterRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = ShelterSerializer(data=request.data)
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
        
        serializer = ShelterSerializer(shelter, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ShelterList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = Shelter.objects.all()
        serializer = ShelterSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
