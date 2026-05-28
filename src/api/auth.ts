import { http, unwrapApiData } from '@/api/http';
import type { ApiEnvelope } from '@/api/types';
import type { JoinFormValues } from '@/pages/MyPageEditPage/types';

interface LoginTokenPayload {
  accessToken: string;
  refreshToken: string;
}

interface KakaoRedirectObject {
  redirectUrl?: string;
  url?: string;
}

type KakaoRedirectData = string | KakaoRedirectObject;

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

function extractKakaoRedirectUrl(data: KakaoRedirectData): string | null {
  if (typeof data === 'string') {
    return data;
  }

  const url = data.redirectUrl ?? data.url;
  if (typeof url === 'string') {
    return url;
  }

  return null;
}

export async function getKakaoLoginRedirectUrl() {
  const response = await http.get<ApiEnvelope<KakaoRedirectData>>('/auth/kakao');
  return extractKakaoRedirectUrl(unwrapApiData(response));
}

export async function loginWithKakaoCode(code: string) {
  const response = await http.get<ApiEnvelope<LoginTokenPayload>>('/auth/kakao/redirect', {
    params: { code },
  });
  return unwrapApiData(response);
}

export async function loginWithEmail(payload: EmailLoginRequest) {
  const response = await http.post<ApiEnvelope<LoginTokenPayload>>('/auth/login', payload);
  return unwrapApiData(response);
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

  await http.post<ApiEnvelope<unknown>>('/auth/register', payload);
}
