from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
import json
from .models import ChatMessage
UserModel = get_user_model()

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        async_to_sync(self.channel_layer.group_add)(self.user.account_id, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.user.account_id, self.channel_name)
    
    def receive(self, text_data):
        # {
        # 'data': <data>
        # 'receiver': <receiver_id>
        # }
        text_data_json = json.loads(text_data)
        data = text_data_json['data']
        receiver_id = text_data_json['receiver_id']
        try:
            receiver = UserModel.objects.get(pk=receiver_id)
        except (UserModel.DoesNotExist):
            self.send(text_data=json.dumps({"error: user not found"}))
        ChatMessage.objects.create(sender=self.user, receiver=receiver, data=data)
    
    def send_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({'message': message}))
