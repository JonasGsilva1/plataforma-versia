from django.db import models
from django.conf import settings
from cursos.models import Aula

class ProgressoAula(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    aula = models.ForeignKey(Aula, on_delete=models.CASCADE, related_name='progresso')
    concluida = models.BooleanField(default=False)
    concluida_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('usuario', 'aula')
        verbose_name = 'Progresso da Aula'
        verbose_name_plural = 'Progressos das Aulas'
    
    def __str__(self):
        status = '✅' if self.concluida else '⏳'
        return f'{status} {self.usuario.username} - {self.aula.titulo}'