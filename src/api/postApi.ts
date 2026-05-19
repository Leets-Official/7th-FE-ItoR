import api from "./index";
import type { Post } from "@/types/post";

export const fetchPosts = async (page: number, size: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const endpoint = accessToken ? "/posts/all/token" : "/posts/all";

  const res = await api.get(endpoint, {
    params: { page, size },
  });
  return res.data;
};

export const fetchPostDetail = async (postId: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const endpoint = accessToken ? "/posts/token" : "/posts";

  const res = await api.get(endpoint, {
    params: { postId },
  });
  return res.data;
};

export const createPost = async (payload: Pick<Post, "title" | "contents">) => {
  const res = await api.post("/posts", payload);
  return res.data;
};

export const updatePost = async (postId: string, payload: Pick<Post, "title" | "contents">) => {
  const res = await api.patch("/posts", payload, {
    params: { postId },
  });
  return res.data;
};

export const deletePost = async (postId: string) => {
  const res = await api.delete("/posts", {
    params: { postId },
  });
  return res.data;
};

export type { Post } from "@/types/post";
