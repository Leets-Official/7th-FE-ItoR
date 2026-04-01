export const AUTH_QUERY_KEY = {
  ALL: ['AUTH'] as const,
  KAKAO: () => [...AUTH_QUERY_KEY.ALL, 'KAKAO'] as const,
} as const;
