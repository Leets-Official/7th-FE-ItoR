import { useState } from "react";
import { login, register, registerKakao } from "@/api/auth";
import { clearAuthSession } from "@/api";
import { useUserStore } from "@/store/useUserStore";

export interface RegisterRequest {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
}

export interface RegisterOAuthRequest {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
  kakaoId: number;
}

export function useAuth() {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await login(email, password);
      setUser(user);
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      await register(data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterOAuth = async (data: RegisterOAuthRequest) => {
    try {
      setLoading(true);
      await registerKakao(data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
  };

  return { handleLogin, handleRegister, handleRegisterOAuth, handleLogout, loading };
}
