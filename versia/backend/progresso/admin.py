from django.contrib import admin
from .models import ProgressoAula

@admin.register(ProgressoAula)
class ProgressoAulaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'aula', 'concluida', 'concluida_em')
    list_filter = ('concluida', 'usuario')