from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def inicio(request):
    return HttpResponse("🏢 Bem-vindo à API Versia!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', inicio),
    path('api/', include('usuarios.urls')),
    path('api/', include('cursos.urls')),
    path('api/', include('progresso.urls')),
]