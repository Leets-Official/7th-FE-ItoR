import { http } from '@/api/http';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface CreateCommentRequest {
  content: string;
}

export async function createComment(postId: string, payload: CreateCommentRequest) {
  const response = await http.post<ApiResponse<unknown>>(`/comments/${postId}`, payload);
  return response.data.data;
}

export async function deleteComment(commentId: number) {
  await http.delete<ApiResponse<unknown>>(`/comments/${commentId}`);
}
