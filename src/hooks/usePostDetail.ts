import { useState, useEffect } from "react";
import { fetchPostDetail } from "@/api/postApi";
import type { Post } from "@/types/post";

export const usePostDetail = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        const res = await fetchPostDetail(postId);
        if (res.code === 200) {
          setPost(res.data);
        } else {
          console.error("게시글 상세 조회 실패:", res.message);
        }
      } catch (err) {
        console.error("게시글 상세 조회 에러:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [postId]);

  return { post, loading };
};
