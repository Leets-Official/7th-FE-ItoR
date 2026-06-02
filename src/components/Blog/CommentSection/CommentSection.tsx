import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import * as S from "./CommentSection.styled";
import CommentItem from "./CommentItem";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { useToast } from "@/contexts/ToastContext";

interface CommentSectionProps {
  isLoggedIn: boolean;
  postId: string;
  postAuthorProfile: string;
  postAuthorName: string;
  onLoginClick?: () => void;
  onSubmit?: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  isLoggedIn,
  postAuthorProfile,
  postId,
  onSubmit,
}) => {
  const { user } = useUserStore();
  const { comments, addComment, editComment, removeComment } = useComments(postId);
  const { showToast } = useToast();

  const [comment, setComment] = useState("");
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await addComment(comment);
      onSubmit?.(comment);
      setComment("");
      showToast("댓글이 등록되었습니다.", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "댓글 등록에 실패했습니다.";
      showToast(message, "error");
    }
  };

  const handleDelete = async () => {
    if (!targetCommentId) return;

    try {
      await removeComment(targetCommentId);
      showToast("댓글이 삭제되었습니다.", "success");
      setIsDeleteModalOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "댓글 삭제에 실패했습니다.";
      showToast(message, "error");
    }
  };

  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>
          댓글 <span className={S.count}>{comments.length}</span>
        </h2>

        {comments.map((c) => (
          <CommentItem
            key={c.id}
            author={c.author}
            date={c.date}
            content={c.content}
            profileUrl={c.profileUrl}
            isOwner={c.isOwner}
            isLoggedIn={isLoggedIn}
            onDelete={() => {
              setTargetCommentId(c.id);
              setIsDeleteModalOpen(true);
            }}
            onEdit={(newContent) => editComment(c.id, newContent)}
          />
        ))}

        {isLoggedIn ? (
          <div className={S.commentWrapper}>
            <div className={S.commentProfile}>
              <Avatar src={user?.profilePicture ?? postAuthorProfile} size="xs" />
              <p className={S.commentNick}>{user?.nickname ?? "익명"}</p>
            </div>
            <div className={S.commentBox}>
              <TextField
                placeholder="댓글을 입력해 주세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="borderless"
                size="md"
                fullWidth
                multiline
              />
              <Button
                label="등록"
                onClick={handleSubmit}
                disabled={!comment.trim()}
                variant={comment.trim() ? "inverse" : "tertiary"}
                size="sm"
              />
            </div>
          </div>
        ) : (
          <p className={S.subText}>로그인 후 댓글을 작성해 보세요!</p>
        )}
      </section>

      <Modal
        title="댓글을 삭제할까요?"
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
      />
    </>
  );
};

export default CommentSection;
