from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ('username', 'email', 'papel', 'is_active')
    list_filter = ('papel', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Extras', {'fields': ('papel', 'telefone')}),
    )