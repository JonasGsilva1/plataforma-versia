# TODO — Finalização do backend Versia

## ✅ Fase 1 — Configuração base
- [x] Revisar `settings.py` (SHARED/TENANT apps, TENANT_MODEL, AUTH_USER_MODEL, JWT, CORS, MEDIA, DATABASES via env)
- [x] Criar `config/urls_public.py` (schema público) + `config/urls.py` (tenant)
- [x] Atualizar `requirements.txt` (django-cors-headers, python-dotenv)
- [x] Criar `.env.example`

## ✅ Fase 2 — Correções
- [x] Corrigir `cursos/serializers.py` (método progresso, total_aulas via SerializerMethodField)
- [x] Criar `__init__.py` em apps/migrations faltantes (cursos, materiais)

## ✅ Fase 3 — Implementação dos apps
- [x] `empresas/` → serializers, views, urls (CRUD de tenants no schema público)
- [x] `usuarios/` → login, logout, registro, usuário atual, refresh
- [x] `matriculas/` → listar minhas, matricular, concluir
- [x] `materiais/` → listar por aula, detalhe
- [x] `certificados/` → meus, emitir, validar público por UUID

## ✅ Fase 4 — Documentação
- [x] README com passo-a-passo multi-tenant (migrate_schemas --shared, tenants, hosts)
- [x] Documentação de endpoints

## ▶️ Passos de execução (usuário)
- [ ] `pip install -r requirements.txt`
- [ ] `docker-compose up -d`
- [ ] `python manage.py makemigrations`
- [ ] `python manage.py migrate_schemas --shared`
- [ ] `python manage.py createsuperuser`
- [ ] Criar Empresa+Dominio (admin ou API)
- [ ] `python manage.py migrate_schemas`
- [ ] Ajustar `hosts` com `<schema>.localhost`
- [ ] `python manage.py runserver`
