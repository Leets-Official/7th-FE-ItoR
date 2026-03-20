type Id = string | number;
type QueryParams = Record<string, unknown> | undefined;

export const QUERY_KEY = {
  POST: {
    ALL: ['POST'] as const,
    LIST: (params?: QueryParams) => [...QUERY_KEY.POST.ALL, 'LIST', params] as const,
    DETAIL: (postId: Id) => [...QUERY_KEY.POST.ALL, 'DETAIL', postId] as const,
    TOKEN_LIST: (params?: QueryParams) => [...QUERY_KEY.POST.ALL, 'TOKEN_LIST', params] as const,
    TOKEN_DETAIL: (postId: Id) => [...QUERY_KEY.POST.ALL, 'TOKEN_DETAIL', postId] as const,
  },
  COMMENT: {
    ALL: ['COMMENT'] as const,
    LIST: (postId: Id) => [...QUERY_KEY.COMMENT.ALL, 'LIST', postId] as const,
  },
  AUTH: {
    ALL: ['AUTH'] as const,
    KAKAO: () => [...QUERY_KEY.AUTH.ALL, 'KAKAO'] as const,
  },
  USER: {
    ALL: ['USER'] as const,
    ME: () => [...QUERY_KEY.USER.ALL, 'ME'] as const,
  },
  IMAGE: {
    ALL: ['IMAGE'] as const,
    PRESIGNED_URL: (params?: QueryParams) =>
      [...QUERY_KEY.IMAGE.ALL, 'PRESIGNED_URL', params] as const,
  },
} as const;
