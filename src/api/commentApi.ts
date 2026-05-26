import api from "./index";
import { useAuthStore } from "@/store/useAuthStore";
import { mockCreateComment, mockDeleteComment, mockUpdateComment } from "./mockData";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";

const getAuthHeaders = () => {
  const accessToken = useAuthStore.getState().accessToken ?? localStorage.getItem("accessToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
};

export const createComment = async (postId: string, content: string) => {
  if (USE_MOCK_AUTH) {
    return mockCreateComment(postId, content);
  }

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
  if (USE_MOCK_AUTH) {
    return mockUpdateComment(commentId, content);
  }

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
  if (USE_MOCK_AUTH) {
    return mockDeleteComment(commentId);
  }

  const res = await api.delete(`/comments/${commentId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
