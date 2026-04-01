from rest_framework import serializers
from .models import Curso, Modulo, Aula

class SerializadorAula(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = ('id', 'titulo', 'video_url', 'descricao', 'ordem', 'duracao')


class SerializadorModulo(serializers.ModelSerializer):
    aulas = SerializadorAula(many=True, read_only= True)

    class Meta:
        model = Modulo
        fields = ('id', 'titulo', 'ordem', 'aulas')


class SerializadorCurso(serializers.ModelSerializer):
    modulos = SerializadorModulo(many=True, read_only=True)
    total_aulas = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = ('id', 'titulo', 'descricao', 'capa', 'criado_em', 'modulos', 'total_aulas')

    def get_total_aulas(self, obj):
        return obj.total_aulas


class SerializadorListaCurso(serializers.ModelSerializer):
    total_aulas = serializers.SerializerMethodField()
    progresso = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = ('id', 'titulo', 'descricao', 'capa', 'criado_em', 'total_aulas', 'progresso')

    def get_total_aulas(self, obj):
        return obj.total_aulas()

    def get_processo(self, obj):
        usuario = self.context['request'].user
        return obj.progresso(usuario)