from django.urls import path
from . import views

urlpatterns = [
    path('pagos/notificacion-redsys/', views.notificacion_redsys, name='notificacion_redsys'),
    path('pagos/<int:pedido_id>/estado/', views.estado_pago, name='estado_pago'),
]