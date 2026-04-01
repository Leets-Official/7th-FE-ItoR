import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { http } from '@apis/core';
import { POST_QUERY_KEY } from './queryKey';
import type { GetPostListParams, PostListResponse } from './type';

export async function getPostList(params: GetPostListParams) {
  return http.get<PostListResponse>('posts/all', {
    searchParams: {
      size: params.size,
      page: params.page,
    },
  });
}

export function postListQueryOptions(params: GetPostListParams) {
  return queryOptions({
    queryKey: POST_QUERY_KEY.LIST(params),
    queryFn: () => getPostList(params),
  });
}

export function useSuspensePostListQuery(params: GetPostListParams) {
  return useSuspenseQuery(postListQueryOptions(params));
}
