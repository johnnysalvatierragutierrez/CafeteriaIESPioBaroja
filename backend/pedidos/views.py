import random
import string
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Pedido, LineaPedido
from .serializers import PedidoSerializer, CrearPedidoSerializer, EstadoPedidoSerializer
from productos.models import Producto

def generar_codigo():
    chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    while True:
        codigo = ''.join(random.choices(chars, k=6))
        if not Pedido.objects.filter(codigo_recogida=codigo).exists():
            return codigo

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def pedidos(request):
    if request.method == 'GET':
        if request.user.rol in ['dueño', 'staff']:
            qs = Pedido.objects.all()
        else:
            qs = Pedido.objects.filter(usuario=request.user)
        
        estado = request.query_params.get('estado')
        turno = request.query_params.get('turno')
        if estado:
            qs = qs.filter(estado=estado)
        if turno:
            qs = qs.filter(turno=turno)
        
        return Response(PedidoSerializer(qs, many=True).data)

    elif request.method == 'POST':
        serializer = CrearPedidoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        total = 0
        pedido = Pedido.objects.create(
            usuario=request.user,
            turno=data['turno'],
            codigo_recogida=generar_codigo(),
            estado='pendiente_pago',
            total=0
        )

        for linea in data['lineas']:
            producto = Producto.objects.get(id=linea['producto_id'])
            cantidad = linea['cantidad']
            subtotal = producto.precio * cantidad
            total += subtotal
            LineaPedido.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=cantidad,
                subtotal=subtotal
            )

        pedido.total = total
        pedido.save()

        return Response(PedidoSerializer(pedido).data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def pedido_detalle(request, pk):
    try:
        if request.user.rol in ['dueño', 'staff']:
            pedido = Pedido.objects.get(pk=pk)
        else:
            pedido = Pedido.objects.get(pk=pk, usuario=request.user)
    except Pedido.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(PedidoSerializer(pedido).data)

    elif request.method == 'PATCH':
        serializer = EstadoPedidoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        nuevo_estado = serializer.validated_data['estado']
        
        if nuevo_estado == 'cancelado' and request.user.rol == 'cliente':
            if pedido.estado not in ['pendiente_pago']:
                return Response({'error': 'No puedes cancelar este pedido'}, status=status.HTTP_409_CONFLICT)
        
        pedido.estado = nuevo_estado
        pedido.save()
        return Response(PedidoSerializer(pedido).data)