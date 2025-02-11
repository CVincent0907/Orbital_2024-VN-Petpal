from django.urls import path
from .views import StdUserUpdate, StdUserList, StdUserUploadProfilePic

urlpatterns = [
    path('update/', StdUserUpdate.as_view(), name="update-user"),
    path('list/', StdUserList.as_view(), name="list-user"),
    path('list/<str:q>/', StdUserList.as_view(), name="search-users"),
    path('upload-profilepic/', StdUserUploadProfilePic.as_view(), name="upload-profile-pic"),
]
