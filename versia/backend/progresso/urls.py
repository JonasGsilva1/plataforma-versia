from django.urls import path
from .views import VisaoConcluirAula, VisaoProgressoUsuario

urlpatterns = [
    path('aulas/<int:pk>/concluir/', VisaoConcluirAula.as_view(), name='concluir-aula'),
    path('progresso/', VisaoProgressoUsuario.as_view(), name='progresso-usuario'),
]