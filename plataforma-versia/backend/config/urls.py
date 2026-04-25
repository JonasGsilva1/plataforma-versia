"""URLs do schema de tenant (aplicação por empresa)."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def inicio(request):
    return JsonResponse({
        'servico': 'Versia API',
        'tenant': getattr(request, 'tenant', None) and request.tenant.nome,
        'mensagem': '🏢 Bem-vindo à API Versia!'
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', inicio),
    path('api/', include('usuarios.urls')),
    path('api/', include('cursos.urls')),
    path('api/', include('progresso.urls')),
    path('api/', include('matriculas.urls')),
    path('api/', include('materiais.urls')),
    path('api/', include('certificados.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
