import { useState, useEffect } from "react";
import { fetchPosts } from "@/api/postApi";
import type { ApiPost } from "@/types/post";

export const usePosts = (page: number, size: number) => {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [pageMax, setPageMax] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await fetchPosts(page, size);
        if (res.code === 200) {
          setPosts(res.data.posts || []);
          setPageMax(res.data.pageMax || 1);
        } else {
          console.error("게시글 조회 실패:", res.message);
        }
      } catch (err) {
        console.error("게시글 조회 에러:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [page, size]);

  return { posts, pageMax, loading };
};
