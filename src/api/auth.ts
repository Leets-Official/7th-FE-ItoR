import type { AxiosError } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { User } from "@/store/useUserStore";
import api, { type ApiResponse, syncAuthTokens } from "./index";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profilePicture: string;
    name: string;
    birthDate: string;
    introduction: string;
    loginType?: "email" | "kakao";
  };
}

interface KakaoSignupNeeded {
  nickname: string;
  picture: string;
  kakaoId: number;
  httpStatus: string;
  responseMessage: string;
}

interface KakaoLoginSuccess {
  id: number;
  email: string;
  name: string;
  nickname: string;
  picture?: string;
  profilePicture?: string;
  birthDate: string;
  introduction?: string;
  accessToken: string;
  refreshToken: string;
  loginType?: "kakao";
}

export type KakaoCallbackResponse = ApiResponse<KakaoLoginSuccess> | ApiResponse<KakaoSignupNeeded>;

interface ApiErrorResponse {
  message?: string;
  code?: number;
  data?: unknown;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const saveTokens = (accessToken: string, refreshToken: string) => {
  syncAuthTokens(accessToken, refreshToken);
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const res = await api.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    });

    const { accessToken, refreshToken, user } = res.data.data;
    saveTokens(accessToken, refreshToken);

    return {
      ...user,
      loginType: user.loginType ?? "email",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message ?? "로그인 요청 중 오류가 발생했습니다.");
  }
};

export const getKakaoLoginUrl = async (): Promise<string> => {
  const res = await api.get<ApiResponse<string>>("/auth/kakao");
  return res.data.data;
};

export const handleKakaoCallback = async (
  code: string,
): Promise<User | ApiResponse<KakaoSignupNeeded>> => {
  try {
    const res = await api.get<KakaoCallbackResponse>(`/auth/kakao/redirect?code=${code}`);

    if (res.data.code === 401) {
      return {
        code: 401,
        message: res.data.message,
        data: res.data.data as KakaoSignupNeeded,
      };
    }

    const u = res.data.data as KakaoLoginSuccess;
    saveTokens(u.accessToken, u.refreshToken);

    return {
      id: u.id,
      email: u.email,
      nickname: u.nickname,
      profilePicture: u.profilePicture ?? u.picture ?? "",
      name: u.name,
      birthDate: u.birthDate,
      introduction: u.introduction ?? "",
      loginType: u.loginType ?? "kakao",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message ?? "카카오 로그인 처리 중 오류가 발생했습니다.");
  }
};

export const register = async (userData: {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
}) => {
  const res = await api.post<ApiResponse<null>>("/auth/register", userData);
  return res.data;
};

export const registerKakao = async (userData: {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
  kakaoId: number;
}) => {
  const res = await api.post<ApiResponse<null>>("/auth/register-oauth", userData);
  return res.data;
};

export const reissueToken = async () => {
  const refreshToken = useAuthStore.getState().refreshToken ?? localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await api.post<ApiResponse<TokenResponse>>("/auth/reissue", {
    refreshToken,
  });

  saveTokens(res.data.data.accessToken, res.data.data.refreshToken);

  return res.data;
};
