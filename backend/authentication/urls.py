from django.urls import path
from .views import UserLogin, UserLogout, UserView, EmailIsAvailable
from shelter.views import ShelterRegister

urlpatterns = [
    path('register/shelter/', ShelterRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('is-available/<str:role>/<str:email>/', EmailIsAvailable.as_view(), name='check-email')
]
