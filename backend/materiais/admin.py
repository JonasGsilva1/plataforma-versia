from django.contrib import admin
from .models import Material

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'aula', 'tipo', 'criado_em')
    list_filter = ('tipo',)
    search_fields = ('titulo', 'aula__titulo')