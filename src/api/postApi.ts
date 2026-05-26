import api from "./index";
import type { Post } from "@/types/post";
import {
  mockCreatePost,
  mockDeletePost,
  mockFetchPostDetail,
  mockFetchPosts,
  mockUpdatePost,
} from "./mockData";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";

export const fetchPosts = async (page: number, size: number) => {
  if (USE_MOCK_AUTH) {
    return mockFetchPosts(page, size);
  }

  const accessToken = localStorage.getItem("accessToken");
  const endpoint = accessToken ? "/posts/all/token" : "/posts/all";

  const res = await api.get(endpoint, {
    params: { page, size },
  });
  return res.data;
};

export const fetchPostDetail = async (postId: string) => {
  if (USE_MOCK_AUTH) {
    return mockFetchPostDetail(postId);
  }

  const accessToken = localStorage.getItem("accessToken");
  const endpoint = accessToken ? "/posts/token" : "/posts";

  const res = await api.get(endpoint, {
    params: { postId },
  });
  return res.data;
};

export const createPost = async (payload: Pick<Post, "title" | "contents">) => {
  if (USE_MOCK_AUTH) {
    return mockCreatePost(payload);
  }

  const res = await api.post("/posts", payload);
  return res.data;
};

export const updatePost = async (postId: string, payload: Pick<Post, "title" | "contents">) => {
  if (USE_MOCK_AUTH) {
    return mockUpdatePost(postId, payload);
  }

  const res = await api.patch("/posts", payload, {
    params: { postId },
  });
  return res.data;
};

export const deletePost = async (postId: string) => {
  if (USE_MOCK_AUTH) {
    return mockDeletePost(postId);
  }

  const res = await api.delete("/posts", {
    params: { postId },
  });
  return res.data;
};

export type { Post } from "@/types/post";
