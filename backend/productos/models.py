from django.db import models

class Producto(models.Model):
    CATEGORIA_CHOICES = [
        ('combina', 'Combina'),
        ('especial', 'Especial'),
        ('desayuno', 'Desayuno'),
        ('bocadillos', 'Bocadillos'),
        ('cafes', 'Cafés'),
    ]

    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    disponible = models.BooleanField(default=True)
    stock = models.IntegerField(default=50)
    emoji = models.CharField(max_length=10, default='🍱')
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} ({self.categoria})"