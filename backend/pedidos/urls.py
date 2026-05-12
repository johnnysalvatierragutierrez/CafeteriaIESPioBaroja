from django.urls import path
from . import views

urlpatterns = [
    path('pedidos/', views.pedidos, name='pedidos'),
    path('pedidos/<int:pk>/', views.pedido_detalle, name='pedido_detalle'),
    path('orders/<int:pk>/', views.pedido_detalle, name='order_detalle'),
    path('orders/<int:pk>/state/', views.pedido_detalle, name='order_state'),
]