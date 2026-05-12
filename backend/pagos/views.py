from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from pedidos.models import Pedido

@api_view(['POST'])
@permission_classes([AllowAny])
def notificacion_redsys(request):
    pedido_id = request.data.get('pedido_id')
    resultado = request.data.get('resultado', 'aceptado')
    try:
        pedido = Pedido.objects.get(pk=pedido_id)
        if resultado == 'aceptado':
            pedido.estado = 'pagado'
            for linea in pedido.lineas.all():
                linea.producto.stock -= linea.cantidad
                linea.producto.save()
        else:
            pedido.estado = 'cancelado'
        pedido.save()
        return Response({'ok': True})
    except Pedido.DoesNotExist:
        return Response({'error': 'Pedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def estado_pago(request, pedido_id):
    try:
        pedido = Pedido.objects.get(pk=pedido_id, usuario=request.user)
        return Response({
            'pedido_id': pedido.id,
            'estado_pago': 'aceptado' if pedido.estado != 'pendiente_pago' else 'pendiente',
            'estado_pedido': pedido.estado,
            'codigo_recogida': pedido.codigo_recogida
        })
    except Pedido.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=status.HTTP_404_NOT_FOUND)