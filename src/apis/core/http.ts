import type { Options } from 'ky';
import { api } from './api';
import type { BaseResponse } from './types.ts';

async function request<T>(method: string, url: string, options?: Options) {
  const response = await api(url, {
    ...options,
    method,
  }).json<BaseResponse<T>>();

  return response.data;
}

export const http = {
  get: <T>(url: string, options?: Options) => request<T>('GET', url, options),
  post: <T>(url: string, options?: Options) => request<T>('POST', url, options),
  patch: <T>(url: string, options?: Options) => request<T>('PATCH', url, options),
  delete: <T>(url: string, options?: Options) => request<T>('DELETE', url, options),
};
