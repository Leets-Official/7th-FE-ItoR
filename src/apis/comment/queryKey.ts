type CommentId = string | number;
type PostId = string | number;

export const COMMENT_QUERY_KEY = {
  ALL: ['COMMENT'] as const,
  LIST: (postId: PostId) => [...COMMENT_QUERY_KEY.ALL, 'LIST', postId] as const,
  DETAIL: (commentId: CommentId) => [...COMMENT_QUERY_KEY.ALL, 'DETAIL', commentId] as const,
} as const;
