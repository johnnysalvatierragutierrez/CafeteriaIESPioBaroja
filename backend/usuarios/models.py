from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROL_CHOICES = [
        ('cliente', 'Cliente'),
        ('staff', 'Staff'),
        ('dueño', 'Dueño'),
    ]
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='cliente')
    google_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    foto_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.email} ({self.rol})"