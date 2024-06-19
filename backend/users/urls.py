from django.urls import path
from .views import StdUserUpdate

urlpatterns = [
    path('update/', StdUserUpdate.as_view(), name="update-user"),
]
