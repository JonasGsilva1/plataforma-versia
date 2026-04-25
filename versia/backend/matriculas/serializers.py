from rest_framework import serializers
from .models import Matricula
from cursos.serializers import SerializadorListaCurso


class SerializadorMatricula(serializers.ModelSerializer):
    curso_detalhe = SerializadorListaCurso(source='curso', read_only=True)

    class Meta:
        model = Matricula
        fields = ('id', 'usuario', 'curso', 'curso_detalhe',
                  'matriculado_em', 'concluido', 'concluido_em')
        read_only_fields = ('id', 'usuario', 'matriculado_em', 'concluido', 'concluido_em')
