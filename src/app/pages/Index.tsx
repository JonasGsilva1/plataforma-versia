import { Link } from "react-router";
import { VersiaLogo } from "../components/VersiaLogo";
import { Monitor, Smartphone, LayoutDashboard, Library, BookOpen, Play, Award } from "lucide-react";

export function Index() {
  const pages = [
    {
      id: "01",
      name: "Login Desktop",
      path: "/login-desktop",
      icon: Monitor,
      description: "Tela de login premium com branding e formulário elegante",
      color: "from-[#63E3FF] to-[#2FA7FF]",
    },
    {
      id: "02",
      name: "Login Mobile",
      path: "/login-mobile",
      icon: Smartphone,
      description: "Versão mobile responsiva da tela de login",
      color: "from-[#2FA7FF] to-[#7A2CFF]",
    },
    {
      id: "03",
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      description: "Dashboard estilo streaming com hero header e trilhas de cursos",
      color: "from-[#7A2CFF] to-[#E548FF]",
    },
    {
      id: "04",
      name: "Cursos",
      path: "/courses",
      icon: Library,
      description: "Catálogo completo com busca, filtros e visualização grid/lista",
      color: "from-[#E548FF] to-[#63E3FF]",
    },
    {
      id: "05",
      name: "Curso",
      path: "/course/1",
      icon: BookOpen,
      description: "Página detalhada do curso com módulos e informações",
      color: "from-[#63E3FF] to-[#7A2CFF]",
    },
    {
      id: "06",
      name: "Aula",
      path: "/lesson/1",
      icon: Play,
      description: "Modo cinema com player, materiais e navegação entre aulas",
      color: "from-[#2FA7FF] to-[#E548FF]",
    },
    {
      id: "07",
      name: "Certificado",
      path: "/certificate",
      icon: Award,
      description: "Certificados, badges, histórico e gamificação",
      color: "from-[#7A2CFF] to-[#63E3FF]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#63E3FF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E548FF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <VersiaLogo size="xl" />
            <div className="mt-6">
              <h1 className="text-5xl font-bold text-white mb-4">
                Versia
              </h1>
              <p className="text-xl text-white/70 max-w-3xl">
                Plataforma de treinamento corporativo com visual premium dark, gradientes sofisticados 
                e experiência imersiva completa
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Frames / Páginas</h2>
            <p className="text-white/60">
              Navegue pelas 7 telas da plataforma Versia
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {pages.map((page) => (
              <Link key={page.id} to={page.path}>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer">
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${page.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <page.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-white/40 text-sm font-mono">{page.id}</span>
                          <h3 className="text-2xl font-bold text-white">{page.name}</h3>
                        </div>
                        <p className="text-white/70 leading-relaxed">{page.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-8 py-4 bg-black/20">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Clique para visualizar</span>
                      <div className="flex items-center gap-2 text-[#63E3FF] group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium">Abrir</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tech Info */}
          <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Tecnologias Utilizadas</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Interface</h4>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• React 18.3</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS v4</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Navegação</h4>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• React Router 7</li>
                  <li>• SPA (Single Page App)</li>
                  <li>• Client-side routing</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Design System</h4>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Cores da marca Versia</li>
                  <li>• Gradientes customizados</li>
                  <li>• Dark theme premium</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="mt-8 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Paleta de Cores</h3>
            <div className="flex gap-4">
              <div className="flex-1 text-center">
                <div className="h-24 rounded-xl bg-[#050505] border border-white/20 mb-3"></div>
                <p className="text-white/60 text-sm font-mono">#050505</p>
                <p className="text-white/40 text-xs">Black</p>
              </div>
              <div className="flex-1 text-center">
                <div className="h-24 rounded-xl bg-[#63E3FF] mb-3"></div>
                <p className="text-white/60 text-sm font-mono">#63E3FF</p>
                <p className="text-white/40 text-xs">Cyan</p>
              </div>
              <div className="flex-1 text-center">
                <div className="h-24 rounded-xl bg-[#2FA7FF] mb-3"></div>
                <p className="text-white/60 text-sm font-mono">#2FA7FF</p>
                <p className="text-white/40 text-xs">Blue</p>
              </div>
              <div className="flex-1 text-center">
                <div className="h-24 rounded-xl bg-[#7A2CFF] mb-3"></div>
                <p className="text-white/60 text-sm font-mono">#7A2CFF</p>
                <p className="text-white/40 text-xs">Purple</p>
              </div>
              <div className="flex-1 text-center">
                <div className="h-24 rounded-xl bg-[#E548FF] mb-3"></div>
                <p className="text-white/60 text-sm font-mono">#E548FF</p>
                <p className="text-white/40 text-xs">Magenta</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl border border-white/10">
              <p className="text-white/60 text-sm mb-2">Gradiente Principal:</p>
              <div 
                className="h-16 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #63E3FF 0%, #2FA7FF 30%, #7A2CFF 65%, #E548FF 100%)',
                }}
              ></div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-sm">
                © 2026 Versia. Plataforma de treinamento corporativo.
              </p>
              <p className="text-white/40 text-sm">
                Design premium para empresas de alto desempenho
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}