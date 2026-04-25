from django.db import models
from django_tenants.models import TenantMixin, DomainMixin

class Empresa(TenantMixin):
    nome = models.CharField(max_length=100)
    criado_em = models.DateField(auto_now_add=True)
    
    auto_create_schema = True
    
    class Meta:
        verbose_name = 'Empresa'
        verbose_name_plural = 'Empresas'
    
    def __str__(self):
        return self.nome


class Dominio(DomainMixin):
    class Meta:
        verbose_name = 'Domínio'
        verbose_name_plural = 'Domínios'
    
    def __str__(self):
        return self.domain