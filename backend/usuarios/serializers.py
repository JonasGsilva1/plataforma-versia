from rest_framework import serializers
from .models import Usuario

class SerializadorUsuario(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'papel', 'telefone', 'empresa')
        read_only_fields = ('id',)


class SerializadorLogin(serializers.Serializer):
    usuario = serializers.CharField()
    senha = serializers.CharField(write_only=True)