from django.contrib import admin
from .models import Matricula

@admin.register(Matricula)
class MatriculaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'curso', 'matriculado_em', 'concluido')
    list_filter = ('concluido', 'curso')
    search_fields = ('usuario__username', 'curso__titulo')