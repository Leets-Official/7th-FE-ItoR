import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),

  setAccessToken: (token) => {
    if (token) localStorage.setItem("accessToken", token);
    else localStorage.removeItem("accessToken");
    set({ accessToken: token });
  },

  setRefreshToken: (token) => {
    if (token) localStorage.setItem("refreshToken", token);
    else localStorage.removeItem("refreshToken");
    set({ refreshToken: token });
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },
}));
