from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.PetCreate.as_view(), name='create'),
    path('detail/<int:pk>', views.PetDetail.as_view(), name='detail'),
    path('list/', views.PetList.as_view(), name='list'),
    path('list/<int:shelter_id>', views.PetList.as_view(), name='list'),
    path('update/', views.PetUpdate.as_view(), name='update'),
    path('delete/', views.PetDelete.as_view(), name='delete'),
]