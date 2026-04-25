from django.utils import timezone
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Matricula
from .serializers import SerializadorMatricula
from cursos.models import Curso


class VisaoMinhasMatriculas(generics.ListAPIView):
    serializer_class = SerializadorMatricula
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Matricula.objects.filter(usuario=self.request.user)


class VisaoMatricular(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, requisicao):
        curso_id = requisicao.data.get('curso')
        if not curso_id:
            return Response({'erro': 'Informe o curso.'}, status=400)
        try:
            curso = Curso.objects.get(pk=curso_id, ativo=True)
        except Curso.DoesNotExist:
            return Response({'erro': 'Curso não encontrado.'}, status=404)

        matricula, criado = Matricula.objects.get_or_create(
            usuario=requisicao.user, curso=curso
        )
        serializer = SerializadorMatricula(matricula)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if criado else status.HTTP_200_OK,
        )


class VisaoConcluirMatricula(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, requisicao, pk):
        try:
            matricula = Matricula.objects.get(pk=pk, usuario=requisicao.user)
        except Matricula.DoesNotExist:
            return Response({'erro': 'Matrícula não encontrada.'}, status=404)

        matricula.concluido = True
        matricula.concluido_em = timezone.now()
        matricula.save()
        return Response(SerializadorMatricula(matricula).data)
