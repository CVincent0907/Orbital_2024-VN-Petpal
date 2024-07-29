from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import get_user_model
from django.db.models import Q
from .serializers import ChatMessageSerializer
from .models import ChatMessage

UserModel = get_user_model()

class ChatView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request, receiver_id=None):
        sender = request.user
        if receiver_id:
            try:
                receiver = UserModel.objects.get(pk=receiver_id)
            except (UserModel.DoesNotExist):
                return Response({"detail": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
            messages = ChatMessage.objects.filter(
                (Q(sender_id=sender) & Q(receiver_id=receiver)) | 
                (Q(sender_id=receiver) & Q(receiver_id=sender))
            )
        else:
            messages = ChatMessage.objects.filter(Q(sender_id=sender) | Q(receiver_id=sender))
        #TODO: optimize for less database hit, add pagination
        serializer = ChatMessageSerializer(messages, many=True, context={'request': request})
        return Response({"messages": serializer.data}, status=status.HTTP_200_OK)
