from rest_framework import serializers
from django.db import transaction
from .models import Empresa, Dominio


class SerializadorDominio(serializers.ModelSerializer):
    class Meta:
        model = Dominio
        fields = ('id', 'domain', 'is_primary')


class SerializadorEmpresa(serializers.ModelSerializer):
    dominios = serializers.SerializerMethodField()

    class Meta:
        model = Empresa
        fields = ('id', 'nome', 'schema_name', 'criado_em', 'dominios')
        read_only_fields = ('id', 'criado_em', 'dominios')

    def get_dominios(self, obj):
        return SerializadorDominio(obj.domains.all(), many=True).data


class SerializadorCriarEmpresa(serializers.Serializer):
    nome = serializers.CharField(max_length=100)
    schema_name = serializers.SlugField(max_length=63)
    dominio = serializers.CharField(max_length=255)

    def validate_schema_name(self, valor):
        if valor == 'public':
            raise serializers.ValidationError("'public' é reservado.")
        if Empresa.objects.filter(schema_name=valor).exists():
            raise serializers.ValidationError('Schema já existente.')
        return valor

    def validate_dominio(self, valor):
        if Dominio.objects.filter(domain=valor).exists():
            raise serializers.ValidationError('Domínio já cadastrado.')
        return valor

    @transaction.atomic
    def create(self, validated_data):
        empresa = Empresa.objects.create(
            nome=validated_data['nome'],
            schema_name=validated_data['schema_name'],
        )
        Dominio.objects.create(
            domain=validated_data['dominio'],
            tenant=empresa,
            is_primary=True,
        )
        return empresa
