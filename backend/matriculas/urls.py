from django.urls import path
from .views import VisaoMinhasMatriculas, VisaoMatricular, VisaoConcluirMatricula

urlpatterns = [
    path('matriculas/', VisaoMinhasMatriculas.as_view(), name='minhas-matriculas'),
    path('matriculas/matricular/', VisaoMatricular.as_view(), name='matricular'),
    path('matriculas/<int:pk>/concluir/', VisaoConcluirMatricula.as_view(), name='concluir-matricula'),
]
