from django.urls import path
from .views import VisaoListaCursos, VisaoDetalheCurso, VisaoDetalheAula

urlpatterns = [
    path('cursos/', VisaoListaCursos.as_view(), name='lista-cursos'),
    path('cursos/<int:pk>/', VisaoDetalheCurso.as_view(), name='detalhe-curso'),
    path('aulas/<int:pk>/', VisaoDetalheAula.as_view(), name='detalhe-aula'),
]