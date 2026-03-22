export const USER_QUERY_KEY = {
  ALL: ['USER'] as const,
  ME: () => [...USER_QUERY_KEY.ALL, 'ME'] as const,
} as const;
