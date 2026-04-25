from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Usuario


class SerializadorUsuario(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'papel', 'telefone', 'foto_perfil', 'empresa',
            'criado_em', 'ultimo_acesso',
        )
        read_only_fields = ('id', 'criado_em', 'ultimo_acesso', 'empresa')


class SerializadorLogin(serializers.Serializer):
    usuario = serializers.CharField()
    senha = serializers.CharField(write_only=True)


class SerializadorRegistro(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True, validators=[validate_password])
    confirmacao_senha = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ('username', 'email', 'first_name', 'last_name', 'telefone',
                  'senha', 'confirmacao_senha')

    def validate(self, attrs):
        if attrs['senha'] != attrs['confirmacao_senha']:
            raise serializers.ValidationError({'senha': 'As senhas não conferem.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirmacao_senha')
        senha = validated_data.pop('senha')
        usuario = Usuario(**validated_data)
        usuario.papel = 'aluno'
        usuario.set_password(senha)
        usuario.save()
        return usuario
