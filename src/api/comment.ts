import { http, unwrapApiData } from '@/api/http';
import type { ApiEnvelope } from '@/api/types';

interface CreateCommentRequest {
  content: string;
}

export async function createComment(postId: string, payload: CreateCommentRequest) {
  const response = await http.post<ApiEnvelope<unknown>>(`/comments/${postId}`, payload);
  return unwrapApiData(response);
}

export async function deleteComment(commentId: number) {
  await http.delete<ApiEnvelope<unknown>>(`/comments/${commentId}`);
}
