from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Producto
from .serializers import ProductoSerializer, ProductoStockSerializer

@api_view(['GET', 'POST'])
def productos(request):
    if request.method == 'GET':
        categoria = request.query_params.get('categoria')
        disponible = request.query_params.get('disponible')
        qs = Producto.objects.filter(activo=True)
        if categoria:
            qs = qs.filter(categoria=categoria)
        if disponible:
            qs = qs.filter(disponible=disponible.lower() == 'true')
        serializer = ProductoSerializer(qs, many=True)
        return Response({
            'count': qs.count(),
            'results': serializer.data
        })

    elif request.method == 'POST':
        if not request.user.is_authenticated or request.user.rol not in ['dueño', 'staff']:
            return Response({'error': 'Sin permisos'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'DELETE'])
def producto_detalle(request, pk):
    try:
        producto = Producto.objects.get(pk=pk, activo=True)
    except Producto.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(ProductoSerializer(producto).data)

    elif request.method == 'PATCH':
        if not request.user.is_authenticated or request.user.rol not in ['dueño', 'staff']:
            return Response({'error': 'Sin permisos'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductoSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not request.user.is_authenticated or request.user.rol != 'dueño':
            return Response({'error': 'Sin permisos'}, status=status.HTTP_403_FORBIDDEN)
        producto.activo = False
        producto.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def inventario(request, pk=None):
    if pk:
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'No encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductoStockSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    productos = Producto.objects.filter(activo=True)
    serializer = ProductoStockSerializer(productos, many=True)
    return Response({'results': serializer.data})