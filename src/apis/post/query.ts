import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, http, type BaseResponse } from '@apis/core';
import { POST_QUERY_KEY } from './queryKey';
import type {
  GetPostDetailParams,
  GetPostListParams,
  PostDetailResponse,
  PostListResponse,
} from './type';

function isPostDetailResponse(value: unknown): value is PostDetailResponse {
  return typeof value === 'object' && value !== null && 'postId' in value && 'title' in value;
}

export async function getPostList(params: GetPostListParams) {
  return http.get<PostListResponse>('posts/all', {
    searchParams: {
      size: params.size,
      page: params.page,
    },
  });
}

export async function getPostDetail(params: GetPostDetailParams) {
  const response = await api
    .get('posts/token', {
      searchParams: {
        postId: params.postId,
      },
    })
    .json<BaseResponse<PostDetailResponse> | PostDetailResponse>();

  if (isPostDetailResponse(response)) {
    return response;
  }

  if (
    typeof response === 'object' &&
    response !== null &&
    'code' in response &&
    'message' in response
  ) {
    if (response.code !== 0) {
      throw new Error(response.message || '게시글 상세 조회에 실패했습니다.');
    }

    if ('data' in response && isPostDetailResponse(response.data)) {
      return response.data;
    }
  }

  if (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    isPostDetailResponse(response.data)
  ) {
    return response.data;
  }

  throw new Error('게시글 상세 응답 형식이 올바르지 않습니다.');
}

export function postListQueryOptions(params: GetPostListParams) {
  return queryOptions({
    queryKey: POST_QUERY_KEY.LIST(params),
    queryFn: () => getPostList(params),
  });
}

export function postDetailQueryOptions(params: GetPostDetailParams) {
  return queryOptions({
    queryKey: POST_QUERY_KEY.DETAIL(params.postId),
    queryFn: () => getPostDetail(params),
  });
}

export function useSuspensePostListQuery(params: GetPostListParams) {
  return useSuspenseQuery(postListQueryOptions(params));
}

export function useSuspensePostDetailQuery(params: GetPostDetailParams) {
  return useSuspenseQuery(postDetailQueryOptions(params));
}
