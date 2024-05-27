from django.urls import path
from .views import register_step_one, register_step_two, register_step_three

urlpatterns = [
    path('step-one/', register_step_one, name='register_step_one'),
    path('step-two/', register_step_two, name='register_step_two'),
    path('step-three/', register_step_three, name='register_step_three'),
]
