from rest_framework import serializers
from .models import Pedido, LineaPedido
from productos.models import Producto

class LineaPedidoSerializer(serializers.ModelSerializer):
    producto_id = serializers.IntegerField(source='producto.id', read_only=True)
    nombre = serializers.CharField(source='producto.nombre', read_only=True)

    class Meta:
        model = LineaPedido
        fields = ['producto_id', 'nombre', 'cantidad', 'subtotal']

class PedidoSerializer(serializers.ModelSerializer):
    lineas = LineaPedidoSerializer(many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'codigo_recogida', 'estado', 'turno', 'total', 'creado_en', 'lineas']

class CrearPedidoSerializer(serializers.Serializer):
    turno = serializers.ChoiceField(choices=['recreo', 'salida'])
    lineas = serializers.ListField(
        child=serializers.DictField()
    )

    def validate_lineas(self, lineas):
        for linea in lineas:
            if 'producto_id' not in linea or 'cantidad' not in linea:
                raise serializers.ValidationError("Cada línea necesita producto_id y cantidad")
            try:
                producto = Producto.objects.get(id=linea['producto_id'], disponible=True)
                if producto.stock < linea['cantidad']:
                    raise serializers.ValidationError(f"Stock insuficiente para {producto.nombre}")
            except Producto.DoesNotExist:
                raise serializers.ValidationError(f"Producto {linea['producto_id']} no existe")
        return lineas

class EstadoPedidoSerializer(serializers.Serializer):
    estado = serializers.ChoiceField(choices=[
        'pagado', 'en_preparacion', 'listo', 'recogido', 'cancelado'
    ])