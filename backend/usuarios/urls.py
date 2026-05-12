from django.urls import path
from . import views

urlpatterns = [
    path('auth/google/', views.google_login, name='google_login'),
    path('auth/refresh/', views.refresh_token, name='refresh_token'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/me/', views.me, name='me'),
]