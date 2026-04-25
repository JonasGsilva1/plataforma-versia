from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Material
from .serializers import SerializadorMaterial


class VisaoListaMateriais(generics.ListAPIView):
    serializer_class = SerializadorMaterial
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        qs = Material.objects.all()
        aula_id = self.request.query_params.get('aula')
        if aula_id:
            qs = qs.filter(aula_id=aula_id)
        return qs


class VisaoDetalheMaterial(generics.RetrieveAPIView):
    queryset = Material.objects.all()
    serializer_class = SerializadorMaterial
    permission_classes = (IsAuthenticated,)
