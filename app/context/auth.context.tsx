"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { userService } from "../lib/api/user";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  loginMethod: string;
  avatar?: { url?: string };
  gender?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  loginSuccess: (
    user: AuthUser,
    tokens: { access_token: string; refresh_token?: string },
  ) => void;
  logout: () => void;
  updateUser: (partial: Partial<AuthUser>) => void;
  updateAvatar: (url: string) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const KEYS = {
  access_token: "access_token",
  refresh_token: "refresh_token",
  user_info: "user_info",
} as const;

const storage = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove: (...keys: string[]): void => {
    if (typeof window === "undefined") return;
    try {
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
  },
};

const getInitialState = (): AuthState => {
  const token = storage.get(KEYS.access_token);
  const raw = storage.get(KEYS.user_info);
  if (!token || !raw)
    return { isAuthenticated: false, user: null, isLoading: true };

  try {
    const parsed: AuthUser = JSON.parse(raw);
    if (parsed._id)
      return { isAuthenticated: true, user: parsed, isLoading: true };
  } catch {
    /* ignore */
  }

  return { isAuthenticated: false, user: null, isLoading: true };
};

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  loginSuccess: () => {},
  logout: () => {},
  updateUser: () => {},
  updateAvatar: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(getInitialState);

  // ── loginSuccess ──────────────────────────────────────────────────────────
  const loginSuccess = useCallback(
    (
      user: AuthUser,
      tokens: { access_token: string; refresh_token?: string },
    ) => {
      storage.set(KEYS.access_token, tokens.access_token);
      if (tokens.refresh_token) {
        storage.set(KEYS.refresh_token, tokens.refresh_token);
      }
      storage.set(KEYS.user_info, JSON.stringify(user));

      setState({ isAuthenticated: true, user, isLoading: false });
    },
    [],
  );

  // ── logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    storage.remove(KEYS.access_token, KEYS.refresh_token, KEYS.user_info);
    setState({ isAuthenticated: false, user: null, isLoading: false });
  }, []);

  // ── updateUser ────────────────────────────────────────────────────────────
  const updateUser = useCallback((partial: Partial<AuthUser>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, ...partial };
      storage.set(KEYS.user_info, JSON.stringify(updated));
      return { ...prev, user: updated };
    });
  }, []);

  // ── updateAvatar ──────────────────────────────────────────────────────────
  const updateAvatar = useCallback((url: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, avatar: { url } };
      storage.set(KEYS.user_info, JSON.stringify(updated));
      return { ...prev, user: updated };
    });
  }, []);

  // ── initializeAuth ────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const token = storage.get(KEYS.access_token);
      const refreshToken = storage.get(KEYS.refresh_token);

      if (!token) {
        storage.remove(KEYS.user_info, KEYS.refresh_token);
        setState({ isAuthenticated: false, user: null, isLoading: false });
        return;
      }

      try {
        const res = await userService.getInfo();
        const userData: AuthUser = res?.data || res;

        if (userData?._id) {
          storage.set(KEYS.user_info, JSON.stringify(userData));
          setState({ isAuthenticated: true, user: userData, isLoading: false });
        } else {
          logout();
        }
      } catch (error) {
        const isAuthError =
          error &&
          typeof error === "object" &&
          "response" in error &&
          ((error as { response?: { status?: number } }).response?.status ===
            401 ||
            (error as { response?: { status?: number } }).response?.status ===
              403);

        if (isAuthError || !refreshToken) {
          logout();
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    init();
  }, []);

  // ── Lắng nghe sự kiện auth:logout từ axios interceptor ───────────────────
  useEffect(() => {
    const handleForcedLogout = () => logout();
    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginSuccess,
        logout,
        updateUser,
        updateAvatar,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
