from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    PAPEIS_CHOICES = (
        ('admin', 'Administrador'),
        ('aluno', 'Aluno'),
    )
    
    papel = models.CharField(max_length=10, choices=PAPEIS_CHOICES, default='aluno')
    telefone = models.CharField(max_length=20, blank=True, null=True)
    empresa = models.ForeignKey(
        'empresas.Empresa',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def eh_admin(self):
        return self.papel == 'admin'
    
    def eh_aluno(self):
        return self.papel == 'aluno'