from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg
from pedidos.models import Pedido, LineaPedido
from productos.models import Producto

def es_dueno(user):
    return user.rol == 'dueño'

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resumen(request):
    if not es_dueno(request.user):
        return Response({'error': 'Sin permisos'}, status=403)
    
    fecha_inicio = request.query_params.get('fecha_inicio')
    fecha_fin = request.query_params.get('fecha_fin')
    
    qs = Pedido.objects.exclude(estado__in=['pendiente_pago', 'cancelado'])
    if fecha_inicio:
        qs = qs.filter(creado_en__date__gte=fecha_inicio)
    if fecha_fin:
        qs = qs.filter(creado_en__date__lte=fecha_fin)
    
    total_pedidos = qs.count()
    ingresos = qs.aggregate(total=Sum('total'))['total'] or 0
    ticket_medio = qs.aggregate(media=Avg('total'))['media'] or 0

    producto_top = LineaPedido.objects.filter(
        pedido__in=qs
    ).values('producto__nombre').annotate(
        unidades=Sum('cantidad')
    ).order_by('-unidades').first()

    return Response({
        'total_pedidos': total_pedidos,
        'ingresos_totales': str(round(ingresos, 2)),
        'ticket_medio': str(round(ticket_medio, 2)),
        'producto_mas_vendido': {
            'nombre': producto_top['producto__nombre'] if producto_top else None,
            'unidades_vendidas': producto_top['unidades'] if producto_top else 0
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ventas_por_producto(request):
    if not es_dueno(request.user):
        return Response({'error': 'Sin permisos'}, status=403)
    
    fecha_inicio = request.query_params.get('fecha_inicio')
    fecha_fin = request.query_params.get('fecha_fin')
    limite = int(request.query_params.get('limite', 10))

    qs = LineaPedido.objects.exclude(pedido__estado__in=['pendiente_pago', 'cancelado'])
    if fecha_inicio:
        qs = qs.filter(pedido__creado_en__date__gte=fecha_inicio)
    if fecha_fin:
        qs = qs.filter(pedido__creado_en__date__lte=fecha_fin)

    ranking = qs.values('producto__nombre').annotate(
        unidades_vendidas=Sum('cantidad')
    ).order_by('-unidades_vendidas')[:limite]

    return Response({'results': list(ranking)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ventas_por_turno(request):
    if not es_dueno(request.user):
        return Response({'error': 'Sin permisos'}, status=403)

    qs = Pedido.objects.exclude(estado__in=['pendiente_pago', 'cancelado'])

    resultados = []
    for turno in ['recreo', 'salida']:
        qs_turno = qs.filter(turno=turno)
        resultados.append({
            'turno': turno,
            'total_pedidos': qs_turno.count(),
            'ingresos': str(qs_turno.aggregate(total=Sum('total'))['total'] or 0)
        })

    return Response({'results': resultados})