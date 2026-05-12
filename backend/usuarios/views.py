from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuario
from .serializers import UsuarioSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    code = request.data.get('code')
    if not code:
        return Response({'error': 'Código requerido'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Aquí iría la verificación real con Google
    # Por ahora devolvemos un usuario de prueba
    try:
        usuario, creado = Usuario.objects.get_or_create(
            email='test@iespiobaroja.es',
            defaults={
                'username': 'test',
                'first_name': 'Usuario',
                'last_name': 'Prueba',
                'rol': 'cliente'
            }
        )
        refresh = RefreshToken.for_user(usuario)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UsuarioSerializer(usuario).data
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    refresh = request.data.get('refresh')
    if not refresh:
        return Response({'error': 'Refresh token requerido'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = RefreshToken(refresh)
        return Response({'access': str(token.access_token)})
    except Exception:
        return Response({'error': 'Token inválido'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh = request.data.get('refresh')
        token = RefreshToken(refresh)
        token.blacklist()
    except Exception:
        pass
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UsuarioSerializer(request.user).data)