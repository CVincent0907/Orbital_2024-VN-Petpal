# your_app/urls.py
from django.urls import path
from .views import register_step_one, register_step_two, register_step_three, login_view

urlpatterns = [
    path('register_step_one/', register_step_one, name='register_step_one'),
    path('register_step_two/', register_step_two, name='register_step_two'),
    path('register_step_three/', register_step_three, name='register_step_three'),
    path('login/', login_view, name='login' )
]

