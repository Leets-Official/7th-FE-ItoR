export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
}

export interface RegisterOauthPayload {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
  kakaoId: number;
}

export interface ReissueTokenPayload {
  refreshToken: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  profilePicture: string;
  introduction: string;
  httpStatus: string;
  responseMessage: string;
}

export interface RegisterResponseData {
  email: string;
  nickname: string;
  profilePicture: string;
  introduction: string;
}

export interface ReissueTokenResponseData {
  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  code?: number;
  message?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://blog.leets.land').replace(/\/$/, '');

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getKakaoLoginUrl() {
  return `${API_BASE_URL}/auth/kakao`;
}

export async function loginUser(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
  return postJson<LoginPayload, LoginResponseData>('/auth/login', payload, '로그인');
}

export async function registerUser(payload: RegisterPayload): Promise<ApiResponse<RegisterResponseData>> {
  return postJson<RegisterPayload, RegisterResponseData>('/auth/register', payload, '일반 회원가입');
}

export async function registerOauthUser(payload: RegisterOauthPayload): Promise<ApiResponse<RegisterResponseData>> {
  return postJson<RegisterOauthPayload, RegisterResponseData>('/auth/register-oauth', payload, 'OAuth 회원가입');
}

export async function reissueToken(payload: ReissueTokenPayload): Promise<ApiResponse<ReissueTokenResponseData>> {
  return postJson<ReissueTokenPayload, ReissueTokenResponseData>('/auth/reissue', payload, '토큰 재발급');
}

async function postJson<TPayload, TData>(
  path: string,
  payload: TPayload,
  actionLabel: string,
): Promise<ApiResponse<TData>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  const parsedBody = parseJson<ApiErrorResponse | ApiResponse<TData>>(responseText);

  if (!response.ok) {
    const message =
      parsedBody && 'message' in parsedBody && parsedBody.message
        ? parsedBody.message
        : `${actionLabel} 요청에 실패했습니다. (HTTP ${response.status})`;
    throw new Error(message);
  }

  if (!parsedBody || !('data' in parsedBody)) {
    throw new Error(`${actionLabel} 응답 형식이 예상과 다릅니다.`);
  }

  return parsedBody;
}

function parseJson<T>(value: string): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
