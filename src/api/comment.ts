import { http } from '@/api/http';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export async function deleteComment(commentId: number) {
  await http.delete<ApiResponse<unknown>>(`/comments/${commentId}`);
}
