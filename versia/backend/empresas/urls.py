from django.urls import path
from .views import VisaoListaCriarEmpresa, VisaoDetalheEmpresa

urlpatterns = [
    path('empresas/', VisaoListaCriarEmpresa.as_view(), name='lista-criar-empresa'),
    path('empresas/<int:pk>/', VisaoDetalheEmpresa.as_view(), name='detalhe-empresa'),
]
