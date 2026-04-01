from django.urls import path
from .views import VisaoLogin, VisaoLogout, VisaoUsuarioAtual

urlpatterns = [
    path('auth/login/', VisaoLogin.as_view(), name='login'),
    path('auth/logout/', VisaoLogout.as_view(), name='logout'),
    path('auth/usuario/', VisaoUsuarioAtual.as_view(), name='usuario-atual'),
]