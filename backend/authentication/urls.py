from django.urls import path
from .views import UserLogin, UserLogout, UserView, UserDelete, EmailIsAvailable
from shelters.views import ShelterRegister
from users.views import StdUserRegister

urlpatterns = [
    path('register/shelter/', ShelterRegister.as_view(), name='shelter-register'),
    path('register/user/', StdUserRegister.as_view(), name='user-register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('acc/', UserView.as_view(), name='user-detail'),
    path('delete/', UserDelete.as_view(), name='user-delete'),
    path('is-available/<str:role>/<str:email>/', EmailIsAvailable.as_view(), name='check-email')
]
