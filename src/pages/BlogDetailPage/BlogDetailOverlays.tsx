import { Modal } from '@/components/common/Modal';
import { Toast } from '@/components/common/Toast';

interface BlogDetailOverlaysProps {
  isCommentDeleteModalOpen: boolean;
  isPostDeleteModalOpen: boolean;
  isDeleting: boolean;
  toastMessage: string | null;
  onCloseCommentModal: () => void;
  onConfirmCommentDelete: () => void;
  onClosePostModal: () => void;
  onConfirmPostDelete: () => void;
}

export function BlogDetailOverlays({
  isCommentDeleteModalOpen,
  isPostDeleteModalOpen,
  isDeleting,
  toastMessage,
  onCloseCommentModal,
  onConfirmCommentDelete,
  onClosePostModal,
  onConfirmPostDelete,
}: BlogDetailOverlaysProps) {
  return (
    <>
      <Modal
        isOpen={isCommentDeleteModalOpen}
        title="댓글을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제하기"
        onClose={onCloseCommentModal}
        onConfirm={onConfirmCommentDelete}
      />
      <Modal
        isOpen={isPostDeleteModalOpen}
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제된 블로그는 다시 확인할 수 없어요."
        cancelText="취소"
        confirmText="삭제하기"
        onClose={onClosePostModal}
        onConfirm={onConfirmPostDelete}
      />
      {toastMessage ? (
        <div className="fixed top-[88px] left-1/2 z-50 -translate-x-1/2">
          <Toast message={toastMessage} variant={toastMessage.includes('완료') || toastMessage.includes('삭제') ? 'success' : 'error'} />
        </div>
      ) : null}
      {isDeleting ? null : null}
    </>
  );
}
