from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ProgressoAula
from cursos.models import Aula
from .serializers import SerializadorProgressoAula

class VisaoConcluirAula(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, requisicao, pk):
        try:
            aula = Aula.objects.get(pk=pk)
            progresso, criado = ProgressoAula.objects.get_or_create(
                usuario=requisicao.user,
                aula=aula
            )
            progresso.concluida = True
            progresso.save()
            
            return Response({
                'mensagem': 'Aula marcada como concluída!',
                'aula': aula.titulo,
                'concluida': True
            })
        except Aula.DoesNotExist:
            return Response({'erro': 'Aula não encontrada'}, status=404)


class VisaoProgressoUsuario(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, requisicao):
        progressos = ProgressoAula.objects.filter(usuario=requisicao.user)
        serializador = SerializadorProgressoAula(progressos, many=True)
        return Response(serializador.data)