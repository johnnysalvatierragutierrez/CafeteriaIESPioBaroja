from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'categoria', 'disponible', 'stock', 'emoji']

class ProductoStockSerializer(serializers.ModelSerializer):
    producto_id = serializers.IntegerField(source='id', read_only=True)
    stock_actual = serializers.IntegerField(source='stock')

    class Meta:
        model = Producto
        fields = ['producto_id', 'nombre', 'stock_actual', 'disponible']