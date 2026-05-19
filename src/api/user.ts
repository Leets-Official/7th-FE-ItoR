import { http } from '@/api/http';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

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
  const response = await http.get<ApiResponse<UserProfile>>('/users/me');
  return response.data.data;
}

export async function updateUser(payload: UpdateUserRequest) {
  await http.patch<ApiResponse<unknown>>('/users', payload);
}

export async function updateUserPassword(password: string) {
  await http.patch<ApiResponse<unknown>>('/users/password', { password });
}

export async function updateUserNickname(nickname: string) {
  await http.patch<ApiResponse<unknown>>('/users/nickname', { nickname });
}

export async function updateUserPicture(profilePicture: string) {
  await http.patch<ApiResponse<unknown>>('/users/picture', { profilePicture });
}

