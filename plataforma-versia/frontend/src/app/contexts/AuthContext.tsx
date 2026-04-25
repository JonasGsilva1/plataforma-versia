"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { api, tokenStorage, Usuario, LoginResponse, ApiError } from "../../lib/api";

interface AuthContextValue {
  user: Usuario | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (usuario: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = tokenStorage.getToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const me = await api.get<Usuario>("/auth/usuario/");
      setUser(me);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        tokenStorage.clear();
      }
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, [refreshUser]);

  const login = useCallback(async (usuario: string, senha: string) => {
    const data = await api.post<LoginResponse>(
      "/auth/login/",
      { usuario, senha },
      { auth: false }
    );
    tokenStorage.setTokens(data.token, data.refresh);
    setUser(data.usuario);
  }, []);

  const logout = useCallback(async () => {
    const refresh = tokenStorage.getRefresh();
    try {
      if (refresh) {
        await api.post("/auth/logout/", { refresh });
      }
    } catch {
      // mesmo que falhe, limpa sessão local
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
