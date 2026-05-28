import axios from 'axios';
import { http, unwrapApiData } from '@/api/http';
import type { ApiEnvelope } from '@/api/types';

export async function getPresignedImageUrl(fileName: string) {
  const response = await http.get<ApiEnvelope<string>>('/images/presigned-url', {
    params: { fileName },
  });
  return unwrapApiData(response);
}

export async function uploadImageToPresignedUrl(uploadUrl: string, file: File) {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  });
}

export function getPublicImageUrlFromPresignedUrl(uploadUrl: string) {
  const parsed = new URL(uploadUrl);
  return `${parsed.origin}${parsed.pathname}`;
}
