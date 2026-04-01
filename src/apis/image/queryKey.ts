type QueryParams = Record<string, unknown> | undefined;

export const IMAGE_QUERY_KEY = {
  ALL: ['IMAGE'] as const,
  PRESIGNED_URL: (params?: QueryParams) =>
    [...IMAGE_QUERY_KEY.ALL, 'PRESIGNED_URL', params] as const,
} as const;
