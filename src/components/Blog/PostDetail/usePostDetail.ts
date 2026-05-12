import { useEffect, useState, useRef } from "react";
import { fetchPostDetail, deletePost } from "@/api/postApi";
import type { Post } from "@/types/post";
import { useToast } from "@/contexts/ToastContext";
import { useApiError } from "@/hooks/useApiError";
import { useNavigate } from "react-router-dom";

export function usePostDetail(postId: string | undefined) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { handleError } = useApiError();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);

  const isOwner = post?.isOwner ?? false;
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;

      try {
        const res = await fetchPostDetail(postId);

        if (res.code === 200 && res.data) {
          setPost(res.data);

          const comments = res.data.comments || [];
          setCommentCount(Array.isArray(comments) ? comments.length : 0);
        } else {
          showToast(res.message || "게시글을 불러오지 못했습니다.", "error");
        }
      } catch (error) {
        handleError(error, "게시글 상세 조회");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId, showToast, handleError]);

  const handleDeletePost = async () => {
    if (!postId) return;

    try {
      const res = await deletePost(postId);

      if (res.code === 200) {
        showToast("게시글이 삭제되었습니다.", "success");
        setTimeout(() => navigate("/blog", { replace: true }), 600);
      } else {
        showToast(res.message || "삭제 실패", "error");
      }
    } catch (error) {
      handleError(error, "게시글 삭제");
    }
  };

  const scrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    post,
    loading,
    commentCount,
    setCommentCount,
    isOwner,
    commentRef,
    scrollToComments,
    handleDeletePost,
  };
}
