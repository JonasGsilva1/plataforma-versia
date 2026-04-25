"use client";

import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { VersiaLoginLogo } from "../components/VersiaLoginLogo";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function LoginMobile() {
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
    <div className="min-h-screen bg-[#050505] flex flex-col overflow-hidden">
      <Link to="/" className="fixed top-3 left-3 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar</span>
      </Link>

      <div className="relative overflow-hidden px-6 pt-16 pb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#63E3FF]/20 via-[#7A2CFF]/20 to-[#E548FF]/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(99, 227, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(229, 72, 255, 0.2) 0%, transparent 50%)',
        }}></div>
        <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#050505] z-10"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <VersiaLoginLogo size="md" />
          </div>
          <div className="text-center max-w-sm mx-auto">
            <h1 className="text-xl font-bold text-white leading-tight">
              Transforme o aprendizado
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-2 overflow-y-auto">
        <div className="max-w-sm mx-auto">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-white mb-1">Bem-vindo de volta</h2>
            <p className="text-white/60 text-sm">Entre na sua conta para continuar</p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="usuario" className="block text-xs font-medium text-white/80 mb-1.5">
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
                className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#63E3FF]/50 focus:border-[#63E3FF] transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-white/80 mb-1.5">
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
                className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#63E3FF]/50 focus:border-[#63E3FF] transition-all"
              />
            </div>

            {erro && (
              <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {erro}
              </div>
            )}

            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all shadow-lg shadow-[#63E3FF]/20 hover:shadow-[#63E3FF]/40 active:scale-95 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #63E3FF 0%, #2FA7FF 30%, #7A2CFF 65%, #E548FF 100%)',
                }}
              >
                {loading ? "Entrando..." : "Entrar na plataforma"}
              </button>

              <button
                type="button"
                className="w-full px-6 py-3 rounded-xl font-semibold text-white text-sm border-2 border-white/10 hover:border-[#63E3FF]/50 hover:bg-white/5 active:scale-95 transition-all"
              >
                Criar nova conta
              </button>
            </div>
          </form>

          <div className="mt-4 mb-4 text-center">
            <a href="#" className="text-sm text-[#63E3FF] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
