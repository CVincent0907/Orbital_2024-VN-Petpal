from django.urls import path
from .views import ShelterUpdate, ShelterList, ShelterDetail, ShelterUploadProfilePic, ShelterUploadImage

urlpatterns = [
    path('update/', ShelterUpdate.as_view(), name='update-shelter'),
    path('list/', ShelterList.as_view(), name="list-shelters"),
    path('list/<str:q>/', ShelterList.as_view(), name="search-shelters"),
    path('detail/<str:pk>/', ShelterDetail.as_view(), name="shelter-detail"),
    path('upload-profilepic/', ShelterUploadProfilePic.as_view(), name="upload-profile-pic"),
    path('upload-image/', ShelterUploadImage.as_view(), name="upload-image"),
]
