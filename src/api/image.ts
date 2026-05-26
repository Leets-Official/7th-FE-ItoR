import axios from 'axios';
import { http } from '@/api/http';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export async function getPresignedImageUrl(fileName: string) {
  const response = await http.get<ApiResponse<string>>('/images/presigned-url', {
    params: { fileName },
  });
  return response.data.data;
}

export async function uploadImageToPresignedUrl(uploadUrl: string, file: File) {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  });
}

export function getPublicImageUrlFromPresignedUrl(uploadUrl: string) {
  return uploadUrl.split('?')[0];
}
