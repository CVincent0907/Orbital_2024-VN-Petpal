# your_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('is-available/<str:email>', views.EmailIsAvailable.as_view(), name='check_email')

    # path('register_step_one/', register_step_one, name='register_step_one'),
    # path('register_step_two/', register_step_two, name='register_step_two'),
    # path('register_step_three/', register_step_three, name='register_step_three'),
]
