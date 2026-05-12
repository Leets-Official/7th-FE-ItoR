import { useState, useEffect } from "react";
import { createComment, deleteComment, updateComment } from "@/api/commentApi";
import api from "@/api/index";
import { useAuthStore } from "@/store/useAuthStore";

interface CommentResponse {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  profileUrl: string;
  isOwner: boolean;
}

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  const fetchComments = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const endpoint = accessToken ? "/posts/token" : "/posts";
      const config = accessToken
        ? {
            params: { postId },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        : { params: { postId } };

      const res = await api.get<{
        code: number;
        message?: string;
        data: { comments: CommentResponse[] };
      }>(endpoint, config);

      if (res.data.code === 0 || res.data.code === 200) {
        const list: Comment[] =
          res.data.data?.comments?.map((c) => ({
            id: c.commentId,
            author: c.nickName,
            content: c.content,
            date: new Date(c.createdAt).toLocaleDateString("ko-KR"),
            profileUrl: c.profileUrl ?? "",
            isOwner: c.isOwner ?? false,
          })) ?? [];
        setComments(list);
      } else {
        setError(res.data.message || "댓글 조회 실패");
      }
    } catch (err) {
      console.error("댓글 조회 에러:", err);
      setError("댓글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string) => {
    if (!content.trim()) return;
    try {
      const res = await createComment(postId, content);
      if (res.code === 201 || res.code === 200) {
        await fetchComments();
      } else {
        setError(res.message || "댓글 등록 실패");
      }
    } catch {
      setError("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const editComment = async (id: number, newContent: string) => {
    try {
      const res = await updateComment(id, newContent);
      if (res.code === 201 || res.code === 200) {
        await fetchComments();
      } else {
        setError(res.message || "댓글 수정 실패");
      }
    } catch {
      setError("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const removeComment = async (id: number) => {
    try {
      const res = await deleteComment(id);
      if (res.code === 201 || res.code === 200) {
        await fetchComments();
      } else {
        setError(res.message || "댓글 삭제 실패");
      }
    } catch {
      setError("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, accessToken]);

  return { comments, loading, error, fetchComments, addComment, editComment, removeComment };
};
