from django.urls import path
from . import views

urlpatterns = [
    path('estadisticas/resumen/', views.resumen, name='resumen'),
    path('estadisticas/ventas-por-producto/', views.ventas_por_producto, name='ventas_por_producto'),
    path('estadisticas/ventas-por-turno/', views.ventas_por_turno, name='ventas_por_turno'),
]