from django.db import models
from usuarios.models import Usuario
from productos.models import Producto

class Pedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente_pago', 'Pendiente de pago'),
        ('pagado', 'Pagado'),
        ('en_preparacion', 'En preparación'),
        ('listo', 'Listo'),
        ('recogido', 'Recogido'),
        ('cancelado', 'Cancelado'),
    ]

    TURNO_CHOICES = [
        ('recreo', 'Recreo (11:15)'),
        ('salida', 'Salida (14:30)'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='pedidos')
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente_pago')
    turno = models.CharField(max_length=10, choices=TURNO_CHOICES)
    codigo_recogida = models.CharField(max_length=6, unique=True, blank=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Pedido " + self.codigo_recogida + " - " + self.usuario.email + " - " + self.estado

class LineaPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='lineas')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    subtotal = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return str(self.cantidad) + "x " + self.producto.nombre