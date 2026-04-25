from django.db import models
from cursos.models import Aula

class Material(models.Model):
    TIPOS_CHOICES = (
        ('pdf', 'PDF'),
        ('doc', 'Documento'),
        ('link', 'Link'),
        ('imagem', 'Imagem'),
    )
    
    aula = models.ForeignKey(
        Aula,
        on_delete=models.CASCADE,
        related_name='materiais'
    )
    titulo = models.CharField(max_length=200)
    tipo = models.CharField(max_length=10, choices=TIPOS_CHOICES, default='pdf')
    arquivo = models.FileField(upload_to='materiais/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiais'
    
    def __str__(self):
        return f'{self.titulo} - {self.aula.titulo}'