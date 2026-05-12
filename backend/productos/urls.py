from django.urls import path
from . import views

urlpatterns = [
    path('productos/', views.productos, name='productos'),
    path('productos/<int:pk>/', views.producto_detalle, name='producto_detalle'),
    path('inventario/', views.inventario, name='inventario'),
    path('inventario/<int:pk>/', views.inventario, name='inventario_detalle'),
]