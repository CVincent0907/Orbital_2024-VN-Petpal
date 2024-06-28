from django.urls import path
from .views import ShelterUpdate, ShelterList, ShelterDetail, ShelterUploadProfilePic, ShelterUploadImage

urlpatterns = [
    path('update/', ShelterUpdate.as_view(), name='update-shelter'),
    path('list/', ShelterList.as_view(), name="list-shelters"),
    path('detail/<int:pk>/', ShelterDetail.as_view(), name="shelter-detail"),
    path('upload-profilepic/', ShelterUploadProfilePic.as_view(), name="upload-profile-pic"),
    path('upload-image/', ShelterUploadImage.as_view(), name="upload-image"),
]
