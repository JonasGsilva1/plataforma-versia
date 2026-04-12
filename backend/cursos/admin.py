from django.contrib import admin
from .models import Curso, Modulo, Aula, Categoria

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'criado_em')
    search_fields = ('nome',)

@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'nivel', 'carga_horaria', 'ativo', 'criado_em')
    list_filter = ('nivel', 'ativo', 'categoria')
    search_fields = ('titulo',)

@admin.register(Modulo)
class ModuloAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'curso', 'ordem')
    list_filter = ('curso',)

@admin.register(Aula)
class AulaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'modulo', 'tipo', 'duracao', 'ordem')
    list_filter = ('tipo', 'modulo__curso')