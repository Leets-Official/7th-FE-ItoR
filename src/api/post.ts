import { http } from '@/api/http';
import { getAccessToken } from '@/utils/tokenStorage';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export type PostContentType = 'TEXT' | 'IMAGE';

export interface PostContentRequest {
  contentOrder: number;
  content: string;
  contentType: PostContentType;
}

export interface PostUpsertRequest {
  title: string;
  contents: PostContentRequest[];
}

export interface PostDetailResponse {
  postId: string;
  title: string;
  contents: PostContentRequest[];
  isOwner?: boolean;
  comments?: Array<{
    commentId: number;
    content: string;
    nickName: string;
    profileUrl: string;
    createdAt: string;
    isOwner: boolean;
  }>;
  nickName?: string;
  profileUrl?: string;
  introduction?: string;
  createdAt?: string;
}

export interface PostListItemResponse {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
  contents: PostContentRequest[];
}

interface PostListResponse {
  posts: PostListItemResponse[];
  pageMax: number;
}

export async function getPostDetail(postId: string) {
  const hasAccessToken = Boolean(getAccessToken());
  const endpoint = hasAccessToken ? '/posts/token' : '/posts';

  const response = await http.get<ApiResponse<PostDetailResponse>>(endpoint, {
    params: { postId },
  });
  return response.data.data;
}

export async function getPostList(page: number, size: number) {
  const hasAccessToken = Boolean(getAccessToken());
  const endpoint = hasAccessToken ? '/posts/all/token' : '/posts/all';

  const response = await http.get<ApiResponse<PostListResponse>>(endpoint, {
    params: { page, size },
  });
  return response.data.data;
}

export async function createPost(payload: PostUpsertRequest) {
  const response = await http.post<ApiResponse<unknown>>('/posts', payload);
  return response.data.data;
}

export async function updatePost(postId: string, payload: PostUpsertRequest) {
  const response = await http.patch<ApiResponse<unknown>>('/posts', payload, {
    params: { postId },
  });
  return response.data.data;
}

export async function deletePost(postId: string) {
  await http.delete<ApiResponse<unknown>>('/posts', {
    params: { postId },
  });
}
