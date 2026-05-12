import api from "./index";
import { useAuthStore } from "@/store/useAuthStore";

const getAuthHeaders = () => {
  const accessToken = useAuthStore.getState().accessToken ?? localStorage.getItem("accessToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
};

export const createComment = async (postId: string, content: string) => {
  const res = await api.post(
    `/comments/${postId}`,
    { content },
    {
      headers: getAuthHeaders(),
    },
  );
  return res.data;
};

export const updateComment = async (commentId: number, content: string) => {
  const res = await api.patch(
    `/comments/${commentId}`,
    { content },
    {
      headers: getAuthHeaders(),
    },
  );
  return res.data;
};

export const deleteComment = async (commentId: number) => {
  const res = await api.delete(`/comments/${commentId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
