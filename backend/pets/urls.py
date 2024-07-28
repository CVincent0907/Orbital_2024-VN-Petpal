from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.PetCreate.as_view(), name='create'),
    path('detail/<str:pk>', views.PetDetail.as_view(), name='detail'),
    path('list/', views.PetList.as_view(), name='list'),
    path('update/<str:pk>', views.PetUpdate.as_view(), name='update'),
    path('delete/<str:pk>', views.PetDelete.as_view(), name='delete'),
    path('add-photo/<str:pet_id>', views.PetAddPhoto.as_view(), name='add-photo'),
    path('remove-photo/<int:pk>', views.PetRemovePhoto.as_view(), name='remove_photo'),
]