from rest_framework import serializers
from .models import Certificado


class SerializadorCertificado(serializers.ModelSerializer):
    curso_titulo = serializers.CharField(source='curso.titulo', read_only=True)
    usuario_nome = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Certificado
        fields = ('id', 'usuario', 'usuario_nome', 'curso', 'curso_titulo',
                  'codigo_validacao', 'emitido_em', 'arquivo_pdf')
        read_only_fields = fields
