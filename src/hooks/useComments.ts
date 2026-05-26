import { useEffect, useState } from "react";
import { createComment, deleteComment, updateComment } from "@/api/commentApi";
import { fetchPostDetail } from "@/api/postApi";
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
      const res = (await fetchPostDetail(postId)) as {
        code: number;
        message?: string;
        data: { comments: CommentResponse[] };
      };

      if (res.code === 0 || res.code === 200) {
        const list: Comment[] =
          res.data?.comments?.map((comment) => ({
            id: comment.commentId,
            author: comment.nickName,
            content: comment.content,
            date: new Date(comment.createdAt).toLocaleDateString("ko-KR"),
            profileUrl: comment.profileUrl ?? "",
            isOwner: comment.isOwner ?? false,
          })) ?? [];

        setComments(list);
      } else {
        setError(res.message || "댓글 조회에 실패했습니다.");
      }
    } catch (err) {
      console.error("댓글 조회 오류:", err);
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
        setError(res.message || "댓글 등록에 실패했습니다.");
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
        setError(res.message || "댓글 수정에 실패했습니다.");
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
        setError(res.message || "댓글 삭제에 실패했습니다.");
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
