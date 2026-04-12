from django.db import models
from django.conf import settings
from cursos.models import Curso

class Matricula(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='matriculas'
    )
    curso = models.ForeignKey(
        Curso,
        on_delete=models.CASCADE,
        related_name='matriculas'
    )
    matriculado_em = models.DateTimeField(auto_now_add=True)
    concluido = models.BooleanField(default=False)
    concluido_em = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ('usuario', 'curso')
        verbose_name = 'Matrícula'
        verbose_name_plural = 'Matrículas'
    
    def __str__(self):
        return f'{self.usuario.username} → {self.curso.titulo}'