from django.urls import path
from .views import ShelterUpdate, ShelterList

urlpatterns = [
    path('update/', ShelterUpdate.as_view(), name='update-shelter'),
    path('list/', ShelterList.as_view(), name="list-shelters"),
]
