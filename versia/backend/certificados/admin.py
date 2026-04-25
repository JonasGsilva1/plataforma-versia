from django.contrib import admin
from .models import Certificado

@admin.register(Certificado)
class CertificadoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'curso', 'codigo_validacao', 'emitido_em')
    list_filter = ('curso',)
    search_fields = ('usuario__username', 'curso__titulo')