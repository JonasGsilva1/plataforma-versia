from django.urls import path
from .views import VisaoMeusCertificados, VisaoEmitirCertificado, VisaoValidarCertificado

urlpatterns = [
    path('certificados/', VisaoMeusCertificados.as_view(), name='meus-certificados'),
    path('certificados/emitir/<int:curso_id>/', VisaoEmitirCertificado.as_view(), name='emitir-certificado'),
    path('certificados/validar/<uuid:codigo>/', VisaoValidarCertificado.as_view(), name='validar-certificado'),
]
