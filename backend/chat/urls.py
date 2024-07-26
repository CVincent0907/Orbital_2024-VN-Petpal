from django.urls import path
from .views import ChatView

urlpatterns = [
    path("", ChatView.as_view(), name="Get all messages"),
    path("<str:receiver_id>/", ChatView.as_view(), name="Get messages"),
]
