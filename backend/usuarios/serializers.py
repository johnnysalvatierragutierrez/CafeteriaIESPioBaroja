from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'rol', 'foto_url']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['nombre'] = instance.get_full_name() or instance.username
        return ret