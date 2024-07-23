from django.urls import path

from . import consumers

websocket_urlpatterns = [
    # path("ws/chat/<str:identifier>", consumers.ChatConsumer.as_asgi(), name="chat"),
]
