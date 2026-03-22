import type { GetPostListParams } from './type';

export const POST_QUERY_KEY = {
  ALL: ['POST'] as const,
  LIST: (params: GetPostListParams) => [...POST_QUERY_KEY.ALL, 'LIST', params] as const,
} as const;
