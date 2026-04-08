import type { GetPostListParams } from './type';

export const POST_QUERY_KEY = {
  ALL: ['POST'] as const,
  LIST: (params: GetPostListParams) => [...POST_QUERY_KEY.ALL, 'LIST', params] as const,
  DETAIL: (postId: string) => [...POST_QUERY_KEY.ALL, 'DETAIL', postId] as const,
} as const;
