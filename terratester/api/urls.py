from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('auth/login/', views.login, name='login'),
    path('auth/register/', views.register, name='register'),
]