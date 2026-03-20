export const ROUTE_PATH = {
  ROOT: '/',
  POST: {
    LIST: '/posts',
    DETAIL: (postId: string | number) => `/posts/${postId}`,
    CREATE: '/posts/new',
    EDIT: (postId: string | number) => `/posts/${postId}/edit`,
  },
  USER: {
    MY: '/users/me',
  },
} as const;
