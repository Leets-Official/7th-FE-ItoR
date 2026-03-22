import { QueryClient } from '@tanstack/react-query';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;

export const QUERY_STALE_TIME = 30 * ONE_SECOND;
export const QUERY_GC_TIME = 5 * ONE_MINUTE;
export const QUERY_RETRY_COUNT = 1;
export const MAX_RETRY_DELAY = 30 * ONE_SECOND;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      retry: QUERY_RETRY_COUNT,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, MAX_RETRY_DELAY),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});
