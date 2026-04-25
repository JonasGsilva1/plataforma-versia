from rest_framework import serializers
from .models import Curso, Modulo, Aula, Categoria


class SerializadorCategoria(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('id', 'nome', 'descricao')


class SerializadorAula(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = ('id', 'titulo', 'descricao', 'video_url', 'tipo', 'duracao', 'ordem')


class SerializadorModulo(serializers.ModelSerializer):
    aulas = SerializadorAula(many=True, read_only=True)

    class Meta:
        model = Modulo
        fields = ('id', 'titulo', 'ordem', 'aulas')


class SerializadorCurso(serializers.ModelSerializer):
    modulos = SerializadorModulo(many=True, read_only=True)
    categoria = SerializadorCategoria(read_only=True)
    total_aulas = serializers.SerializerMethodField()
    progresso = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = (
            'id', 'titulo', 'descricao', 'capa', 'categoria',
            'nivel', 'carga_horaria', 'ativo', 'criado_em',
            'modulos', 'total_aulas', 'progresso',
        )

    def get_total_aulas(self, obj):
        return obj.total_aulas()

    def get_progresso(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.progresso(request.user)
        return 0


class SerializadorListaCurso(serializers.ModelSerializer):
    categoria = SerializadorCategoria(read_only=True)
    total_aulas = serializers.SerializerMethodField()
    progresso = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = (
            'id', 'titulo', 'descricao', 'capa', 'categoria',
            'nivel', 'carga_horaria', 'ativo', 'criado_em',
            'total_aulas', 'progresso',
        )

    def get_total_aulas(self, obj):
        return obj.total_aulas()

    def get_progresso(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.progresso(request.user)
        return 0
