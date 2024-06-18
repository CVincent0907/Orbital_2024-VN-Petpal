from django.urls import path
from .views import ShelterUpdate

urlpatterns = [
    path('update/', ShelterUpdate.as_view(), name='update-shelter'),
]
