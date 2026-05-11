import { http } from '@/api/http';
import type { JoinFormValues } from '@/pages/MyPageJoinPage/types';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface LoginTokenPayload {
  accessToken: string;
  refreshToken: string;
}

interface EmailLoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
}

const DEFAULT_PROFILE_PICTURE_URL = 'https://example.com/profile.jpg';

function extractKakaoRedirectUrl(data: unknown): string | null {
  if (typeof data === 'string') {
    return data;
  }

  if (typeof data === 'object' && data !== null) {
    const candidate = data as Record<string, unknown>;
    const url = candidate.redirectUrl ?? candidate.url;
    if (typeof url === 'string') {
      return url;
    }
  }

  return null;
}

function extractLoginTokens(data: unknown): LoginTokenPayload | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const candidate = data as Record<string, unknown>;
  const accessToken = candidate.accessToken;
  const refreshToken = candidate.refreshToken;

  if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
    return { accessToken, refreshToken };
  }

  return null;
}

export async function getKakaoLoginRedirectUrl() {
  const response = await http.get<ApiResponse<unknown>>('/auth/kakao');
  return extractKakaoRedirectUrl(response.data.data);
}

export async function loginWithKakaoCode(code: string) {
  const response = await http.get<ApiResponse<unknown>>('/auth/kakao/redirect', {
    params: { code },
  });
  return extractLoginTokens(response.data.data);
}

export async function loginWithEmail(payload: EmailLoginRequest) {
  const response = await http.post<ApiResponse<unknown>>('/auth/login', payload);
  return extractLoginTokens(response.data.data);
}

export async function registerWithEmail(values: JoinFormValues, profilePicture: string) {
  const payload: RegisterRequest = {
    email: values.email.trim(),
    nickname: values.nickname.trim(),
    password: values.password,
    profilePicture: profilePicture || DEFAULT_PROFILE_PICTURE_URL,
    birthDate: values.birthDate.trim(),
    name: values.name.trim(),
    introduction: values.introduction.trim(),
  };

  await http.post<ApiResponse<unknown>>('/auth/register', payload);
}
