from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import VisaoLogin, VisaoLogout, VisaoUsuarioAtual, VisaoRegistro

urlpatterns = [
    path('auth/login/', VisaoLogin.as_view(), name='login'),
    path('auth/logout/', VisaoLogout.as_view(), name='logout'),
    path('auth/registro/', VisaoRegistro.as_view(), name='registro'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/usuario/', VisaoUsuarioAtual.as_view(), name='usuario-atual'),
]
