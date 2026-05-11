import axios from 'axios';
import { getAccessToken } from '@/utils/tokenStorage';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  const requestUrl = config.url ?? '';
  const isAuthRoute = requestUrl.startsWith('/auth/');

  if (accessToken && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
