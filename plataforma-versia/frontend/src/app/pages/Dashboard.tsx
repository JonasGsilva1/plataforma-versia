"use client";

import { Link } from "react-router";
import { VersiaLogo } from "../components/VersiaLogo";
import { PremiumBadge } from "../components/PremiumBadge";
import {
  Home,
  BookOpen,
  Award,
  Settings,
  Search,
  Bell,
  User,
  Play,
  Clock,
  ChevronRight,
  Zap,
  Menu,
  X,
  Crown,
  Sparkles,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCursos, CursoLista } from "../../lib/hooks";

const FALLBACK_CAPA =
  "https://images.unsplash.com/photo-1764025130362-0162c3dd2035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

function CursoCard({ c, compact = false }: { c: CursoLista; compact?: boolean }) {
  return (
    <Link to={`/course/${c.id}`}>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:bg-white/10 transition-all group cursor-pointer h-full">
        <div className={`relative overflow-hidden ${compact ? "h-40 md:h-48" : "h-44 md:h-56"}`}>
          <img
            src={c.capa || FALLBACK_CAPA}
            alt={c.titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          {c.categoria && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              <span className="bg-[#7A2CFF]/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs font-semibold text-white">
                {c.categoria.nome}
              </span>
            </div>
          )}
        </div>
        <div className="p-4 md:p-6">
          <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
            {c.titulo}
          </h4>
          <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
            {c.descricao}
          </p>
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-white/60 text-xs md:text-sm flex items-center gap-1">
              <Clock className="w-3 md:w-4 h-3 md:h-4" />
              {c.carga_horaria}h
            </span>
            <span className="text-[#63E3FF] text-xs md:text-sm font-semibold">
              {c.progresso ?? 0}%
            </span>
          </div>
          <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#63E3FF] to-[#7A2CFF]"
              style={{ width: `${c.progresso ?? 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Dashboard() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isPremium] = useState(false);
  const { user, logout } = useAuth();
  const { cursos, loading, erro } = useCursos();

  const { emAndamento, concluidos, novos, destaque } = useMemo(() => {
    const emAndamento = cursos.filter(
      (c) => (c.progresso ?? 0) > 0 && (c.progresso ?? 0) < 100
    );
    const concluidos = cursos.filter((c) => (c.progresso ?? 0) === 100);
    const novos = cursos.filter((c) => (c.progresso ?? 0) === 0);
    const destaque = emAndamento[0] || novos[0] || cursos[0] || null;
    return { emAndamento, concluidos, novos, destaque };
  }, [cursos]);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
      >
        {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col z-50 transform transition-transform duration-300 lg:transform-none ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-[#050505]/50 pointer-events-none"></div>

        <VersiaLogo size="md" />

        <nav className="mt-12 flex-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#63E3FF]/20 to-[#7A2CFF]/20 text-white mb-2"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            to="/courses"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 mb-2 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Meus Cursos</span>
          </Link>
          <Link
            to="/certificate"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 mb-2 transition-all"
          >
            <Award className="w-5 h-5" />
            <span className="font-medium">Certificados</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 mb-2 transition-all"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Perfil</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 mb-2 transition-all w-full">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
          </button>
        </nav>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#63E3FF] to-[#7A2CFF] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user?.username || "Usuário"}
              </p>
              <p className="text-white/40 text-xs truncate">{user?.email || "—"}</p>
            </div>
            <button
              onClick={() => logout()}
              title="Sair"
              className="w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}

      {/* Main */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 relative">
          <div className="absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-[#050505]/30 pointer-events-none"></div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#63E3FF]/50 focus:border-[#63E3FF] transition-all text-sm md:text-base"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Estados globais */}
        {loading && (
          <div className="px-4 md:px-8 py-8 text-white/60 text-sm">
            Carregando seus cursos…
          </div>
        )}
        {erro && (
          <div className="px-4 md:px-8 py-8">
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              {erro}
            </div>
          </div>
        )}

        {/* Hero / Destaque */}
        {destaque && (
          <section className="px-4 md:px-8 py-6 md:py-8">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl h-64 md:h-96 group cursor-pointer">
              <img
                src={destaque.capa || FALLBACK_CAPA}
                alt={destaque.titulo}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <div className="relative h-full flex flex-col justify-end p-6 md:p-12">
                <div className="inline-flex items-center gap-2 bg-[#E548FF]/20 backdrop-blur-sm border border-[#E548FF]/30 rounded-full px-3 md:px-4 py-2 mb-3 md:mb-4 w-fit">
                  <Zap className="w-4 h-4 text-[#E548FF]" />
                  <span className="text-xs md:text-sm font-semibold text-white">
                    Destaque
                  </span>
                </div>
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 max-w-2xl leading-tight">
                  {destaque.titulo}
                </h2>
                <p className="text-sm md:text-xl text-white/80 mb-4 md:mb-6 max-w-xl line-clamp-2">
                  {destaque.descricao}
                </p>
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 md:w-5 h-4 md:h-5 text-white/60" />
                    <span className="text-white/80">{destaque.carga_horaria} horas</span>
                  </div>
                </div>
                <Link to={`/course/${destaque.id}`}>
                  <button
                    className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-white flex items-center gap-2 w-fit shadow-lg shadow-[#63E3FF]/20 hover:shadow-[#63E3FF]/40 hover:scale-105 transition-all text-sm md:text-base"
                    style={{
                      background:
                        "linear-gradient(135deg, #63E3FF 0%, #2FA7FF 30%, #7A2CFF 65%, #E548FF 100%)",
                    }}
                  >
                    <Play className="w-4 md:w-5 h-4 md:h-5" />
                    {destaque.progresso && destaque.progresso > 0
                      ? "Continuar"
                      : "Começar agora"}
                  </button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Upsell Premium */}
        {!isPremium && (
          <section className="px-4 md:px-8 py-6">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0a0a0a] via-[#1a1510] to-[#0a0a0a] border border-[#FFD700]/30 p-6 md:p-10">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-4 left-4 w-24 md:w-40 h-24 md:h-40 border-2 border-[#FFD700] rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-32 md:w-48 h-32 md:h-48 border-2 border-[#FF8C00] rounded-full"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FF8C00]/5 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FF8C00] flex items-center justify-center">
                    <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <PremiumBadge variant="medium" />
                    <Sparkles className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Desbloqueie todo o potencial da Versia
                  </h3>
                  <p className="text-white/70 text-sm md:text-base mb-1">
                    Acesso ilimitado • Mentorias 1:1 • Certificados premium • Downloads sem limite
                  </p>
                  <p className="text-[#FFD700] font-semibold text-lg md:text-xl">
                    Apenas R$ 24,90/mês
                  </p>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <Link to="/subscription" className="block">
                    <button
                      className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base text-white shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                      style={{
                        background:
                          "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
                      }}
                    >
                      <Crown className="w-5 h-5" />
                      Assinar Premium
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <p className="text-white/60 text-xs text-center mt-2">
                    🎁 7 dias grátis para testar
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Continuar estudando */}
        <section className="px-4 md:px-8 py-6 md:py-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">Continuar estudando</h3>
            <Link to="/courses" className="text-[#63E3FF] hover:underline flex items-center gap-1 text-sm md:text-base">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {!loading && emAndamento.length === 0 && (
            <div className="text-white/60 text-sm">
              Você ainda não começou nenhum curso. Explore a biblioteca e comece agora.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {emAndamento.map((c) => (
              <CursoCard key={c.id} c={c} compact />
            ))}
          </div>
        </section>

        {/* Concluídos */}
        {concluidos.length > 0 && (
          <section className="px-4 md:px-8 py-6 md:py-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">Concluídos</h3>
              <Link to="/certificate" className="text-[#63E3FF] hover:underline flex items-center gap-1 text-sm md:text-base">
                Certificados <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {concluidos.map((c) => (
                <CursoCard key={c.id} c={c} compact />
              ))}
            </div>
          </section>
        )}

        {/* Novidades */}
        <section className="px-4 md:px-8 py-6 md:py-8 pb-12 md:pb-16">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">Novidades da Versia</h3>
            <Link to="/courses" className="text-[#63E3FF] hover:underline flex items-center gap-1 text-sm md:text-base">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {!loading && novos.length === 0 && (
            <div className="text-white/60 text-sm">Nenhum curso novo disponível.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {novos.map((c) => (
              <CursoCard key={c.id} c={c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
