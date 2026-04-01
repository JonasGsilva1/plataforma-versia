from django.contrib import admin
from .models import Empresa, Dominio

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'schema_name', 'criado_em')
    list_filter = ('criado_em',)
    search_fields = ('nome', 'schema_name')

@admin.register(Dominio)
class DominioAdmin(admin.ModelAdmin):
    list_display = ('domain', 'tenant', 'is_primary')  # ← 'empresa' vira 'tenant'
    list_filter = ('is_primary',)
    search_fields = ('domain',)