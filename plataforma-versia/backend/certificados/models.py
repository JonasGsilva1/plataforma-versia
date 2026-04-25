from django.db import models
from django.conf import settings
from cursos.models import Curso
import uuid

class Certificado(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='certificados'
    )
    curso = models.ForeignKey(
        Curso,
        on_delete=models.CASCADE,
        related_name='certificados'
    )
    codigo_validacao = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    emitido_em = models.DateTimeField(auto_now_add=True)
    arquivo_pdf = models.FileField(upload_to='certificados/', blank=True, null=True)
    
    class Meta:
        unique_together = ('usuario', 'curso')
        verbose_name = 'Certificado'
        verbose_name_plural = 'Certificados'
    
    def __str__(self):
        return f'Certificado de {self.usuario.username} - {self.curso.titulo}'