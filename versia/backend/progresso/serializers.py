from rest_framework import serializers
from .models import ProgressoAula

class SerializadorProgressoAula(serializers.ModelSerializer):
    class Meta:
        model = ProgressoAula
        fields = ('id', 'usuario', 'aula', 'concluida', 'concluida_em')
        read_only_fields = ('id', 'usuario', 'concluida_em')