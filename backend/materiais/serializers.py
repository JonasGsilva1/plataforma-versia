from rest_framework import serializers
from .models import Material


class SerializadorMaterial(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ('id', 'aula', 'titulo', 'tipo', 'arquivo', 'link', 'criado_em')
        read_only_fields = ('id', 'criado_em')
