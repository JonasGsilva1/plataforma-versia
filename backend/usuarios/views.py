from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import SerializadorUsuario, SerializadorRegistro


class VisaoLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self, requisicao):
        nome_usuario = requisicao.data.get('usuario') or requisicao.data.get('username')
        senha = requisicao.data.get('senha') or requisicao.data.get('password')

        usuario = authenticate(username=nome_usuario, password=senha)

        if usuario:
            refresh = RefreshToken.for_user(usuario)
            return Response({
                'token': str(refresh.access_token),
                'refresh': str(refresh),
                'usuario': SerializadorUsuario(usuario).data
            })

        return Response({'erro': 'Credenciais inválidas'}, status=400)


class VisaoLogout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, requisicao):
        try:
            token_refresh = requisicao.data.get('refresh')
            token = RefreshToken(token_refresh)
            token.blacklist()
            return Response({'mensagem': 'Logout realizado com sucesso!'})
        except Exception:
            return Response({'erro': 'Token inválido'}, status=400)


class VisaoUsuarioAtual(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, requisicao):
        serializador = SerializadorUsuario(requisicao.user)
        return Response(serializador.data)

    def patch(self, requisicao):
        serializador = SerializadorUsuario(requisicao.user, data=requisicao.data, partial=True)
        serializador.is_valid(raise_exception=True)
        serializador.save()
        return Response(serializador.data)


class VisaoRegistro(APIView):
    permission_classes = (AllowAny,)

    def post(self, requisicao):
        serializador = SerializadorRegistro(data=requisicao.data)
        serializador.is_valid(raise_exception=True)
        usuario = serializador.save()

        # vincula tenant atual (se houver)
        tenant = getattr(requisicao, 'tenant', None)
        if tenant and tenant.schema_name != 'public':
            usuario.empresa = tenant
            usuario.save(update_fields=['empresa'])

        refresh = RefreshToken.for_user(usuario)
        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'usuario': SerializadorUsuario(usuario).data,
        }, status=201)
