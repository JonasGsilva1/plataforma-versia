from django.urls import path
from .views import VisaoListaMateriais, VisaoDetalheMaterial

urlpatterns = [
    path('materiais/', VisaoListaMateriais.as_view(), name='lista-materiais'),
    path('materiais/<int:pk>/', VisaoDetalheMaterial.as_view(), name='detalhe-material'),
]
