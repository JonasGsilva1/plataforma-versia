"""URLs do schema público (gerenciamento de tenants/empresas)."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def inicio_publico(request):
    return JsonResponse({
        'servico': 'Versia API',
        'schema': 'público',
        'mensagem': 'Rota pública — use o domínio do tenant para acessar a aplicação.'
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', inicio_publico),
    path('api/', include('empresas.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
