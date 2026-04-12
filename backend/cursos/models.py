from django.db import models

class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['nome']
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
    
    def __str__(self):
        return self.nome


class Curso(models.Model):
    NIVEIS_CHOICES = (
        ('iniciante', 'Iniciante'),
        ('intermediario', 'Intermediário'),
        ('avancado', 'Avançado'),
    )
    
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    capa = models.ImageField(upload_to='cursos/capas/', blank=True, null=True)
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cursos'
    )
    nivel = models.CharField(max_length=15, choices=NIVEIS_CHOICES, default='iniciante')
    carga_horaria = models.PositiveIntegerField(default=0, help_text='Carga horária em horas')
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['titulo']
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
    
    def __str__(self):
        return self.titulo
    
    def total_aulas(self):
        return Aula.objects.filter(modulo__curso=self).count()
    
    def aulas_concluidas(self, usuario):
        return Aula.objects.filter(
            modulo__curso=self,
            progresso__usuario=usuario,
            progresso__concluida=True
        ).count()
    
    def progresso(self, usuario):
        total = self.total_aulas()
        if total == 0:
            return 0
        concluidas = self.aulas_concluidas(usuario)
        return int((concluidas / total) * 100)
    
    def esta_concluido(self, usuario):
        return self.progresso(usuario) == 100


class Modulo(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='modulos')
    titulo = models.CharField(max_length=200)
    ordem = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['ordem']
        verbose_name = 'Módulo'
        verbose_name_plural = 'Módulos'
    
    def __str__(self):
        return f'{self.ordem}. {self.titulo}'


class Aula(models.Model):
    TIPOS_CHOICES = (
        ('video', 'Vídeo'),
        ('texto', 'Texto'),
        ('quiz', 'Quiz'),
    )
    
    modulo = models.ForeignKey(Modulo, on_delete=models.CASCADE, related_name='aulas')
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    tipo = models.CharField(max_length=10, choices=TIPOS_CHOICES, default='video')
    duracao = models.PositiveIntegerField(default=0, help_text='Duração em minutos')
    ordem = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['ordem']
        verbose_name = 'Aula'
        verbose_name_plural = 'Aulas'
    
    def __str__(self):
        return self.titulo