from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Empresa
from .serializers import SerializadorEmpresa, SerializadorCriarEmpresa


class VisaoListaCriarEmpresa(generics.ListCreateAPIView):
    """Lista e cria tenants (empresas). Somente superuser."""
    queryset = Empresa.objects.all()
    permission_classes = (permissions.IsAdminUser,)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return SerializadorCriarEmpresa
        return SerializadorEmpresa

    def create(self, request, *args, **kwargs):
        serializer = SerializadorCriarEmpresa(data=request.data)
        serializer.is_valid(raise_exception=True)
        empresa = serializer.save()
        return Response(SerializadorEmpresa(empresa).data, status=201)


class VisaoDetalheEmpresa(generics.RetrieveDestroyAPIView):
    queryset = Empresa.objects.all()
    serializer_class = SerializadorEmpresa
    permission_classes = (permissions.IsAdminUser,)
