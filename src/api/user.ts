import { http, unwrapApiData } from '@/api/http';
import type { ApiEnvelope } from '@/api/types';

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
}

export interface UpdateUserRequest {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
}

export async function getMyProfile() {
  const response = await http.get<ApiEnvelope<UserProfile>>('/users/me');
  return unwrapApiData(response);
}

export async function updateUser(payload: UpdateUserRequest) {
  await http.patch<ApiEnvelope<unknown>>('/users', payload);
}

export async function updateUserPassword(password: string) {
  await http.patch<ApiEnvelope<unknown>>('/users/password', { password });
}

export async function updateUserNickname(nickname: string) {
  await http.patch<ApiEnvelope<unknown>>('/users/nickname', { nickname });
}

export async function updateUserPicture(profilePicture: string) {
  await http.patch<ApiEnvelope<unknown>>('/users/picture', { profilePicture });
}
