"use client";

import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { VersiaLoginLogo } from "../components/VersiaLoginLogo";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function LoginDesktop() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      await login(usuario, senha);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setErro(err?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar ao índice</span>
      </Link>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#63E3FF]/20 via-[#7A2CFF]/20 to-[#E548FF]/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 227, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(229, 72, 255, 0.15) 0%, transparent 50%)',
        }}></div>
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-[#050505] z-10"></div>
        <div className="relative z-10 flex flex-col justify-center p-16 w-full">
          <div>
            <VersiaLoginLogo size="lg" />
            <div className="mt-12 max-w-md">
              <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
                Transforme o aprendizado da sua empresa
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Plataforma com experiência imersiva e foco em retenção de conhecimento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex justify-center">
            <VersiaLoginLogo size="md" />
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-3">Bem-vindo de volta</h2>
            <p className="text-white/60">Entre na sua conta para continuar aprendendo</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-white/80 mb-2">
                Usuário
              </label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="seu.usuario"
                autoComplete="username"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#63E3FF]/50 focus:border-[#63E3FF] transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#63E3FF]/50 focus:border-[#63E3FF] transition-all"
              />
            </div>

            {erro && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {erro}
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-xl font-semibold text-white transition-all shadow-lg shadow-[#63E3FF]/20 hover:shadow-[#63E3FF]/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #63E3FF 0%, #2FA7FF 30%, #7A2CFF 65%, #E548FF 100%)',
                }}
              >
                {loading ? "Entrando..." : "Entrar na plataforma"}
              </button>

              <button
                type="button"
                className="w-full px-6 py-4 rounded-xl font-semibold text-white border-2 border-white/10 hover:border-[#63E3FF]/50 hover:bg-white/5 transition-all"
              >
                Criar nova conta
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-sm text-[#63E3FF] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
