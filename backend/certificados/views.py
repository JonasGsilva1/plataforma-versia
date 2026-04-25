from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Certificado
from .serializers import SerializadorCertificado
from cursos.models import Curso


class VisaoMeusCertificados(generics.ListAPIView):
    serializer_class = SerializadorCertificado
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Certificado.objects.filter(usuario=self.request.user)


class VisaoEmitirCertificado(APIView):
    """Emite certificado quando o curso está 100% concluído."""
    permission_classes = (IsAuthenticated,)

    def post(self, requisicao, curso_id):
        try:
            curso = Curso.objects.get(pk=curso_id)
        except Curso.DoesNotExist:
            return Response({'erro': 'Curso não encontrado.'}, status=404)

        if not curso.esta_concluido(requisicao.user):
            return Response(
                {'erro': 'Curso ainda não concluído.', 'progresso': curso.progresso(requisicao.user)},
                status=400,
            )

        certificado, _ = Certificado.objects.get_or_create(
            usuario=requisicao.user, curso=curso
        )
        return Response(SerializadorCertificado(certificado).data, status=201)


class VisaoValidarCertificado(APIView):
    """Endpoint público: valida certificado por código UUID."""
    permission_classes = (AllowAny,)

    def get(self, requisicao, codigo):
        try:
            cert = Certificado.objects.get(codigo_validacao=codigo)
        except Certificado.DoesNotExist:
            return Response({'valido': False, 'erro': 'Certificado não encontrado.'}, status=404)

        return Response({
            'valido': True,
            'certificado': SerializadorCertificado(cert).data,
        })
