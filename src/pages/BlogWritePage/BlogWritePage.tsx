import { Modal } from '@/components/common/Modal';
import { PageHeader } from '@/components/common/PageHeader';
import { Toast } from '@/components/common/Toast';
import { useParams } from 'react-router-dom';
import { BlogWriteEditor } from './BlogWriteEditor';
import { useBlogWriteState } from './useBlogWriteState';

export function BlogWritePage() {
  const { id } = useParams();
  const postId = id ?? null;
  const state = useBlogWriteState(postId);

  if (state.isEditMode && !state.isApiPostId && !state.post) {
    return (
      <div className="min-h-screen bg-gray-96">
        <PageHeader type="write" className="h-[72px] px-4 py-4" />
        <div className="mx-auto max-w-[688px] px-4 py-8 text-sm text-gray-56">존재하지 않는 게시물입니다.</div>
      </div>
    );
  }

  if (!state.canEdit) {
    return (
      <div className="min-h-screen bg-gray-96">
        <PageHeader type="write" className="h-[72px] px-4 py-4" />
        <div className="mx-auto max-w-[688px] px-4 py-8 text-sm text-gray-56">수정 권한이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <PageHeader
          type="write"
          className="h-[72px] border-b border-gray-96 px-4 py-4"
          onDeletePost={() => (state.isEditMode ? state.setShowDeleteModal(true) : state.navigate(-1))}
          onSubmitPost={state.handleSubmit}
        />
      </div>

      <BlogWriteEditor
        isLoadingPost={state.isLoadingPost}
        title={state.title}
        content={state.content}
        images={state.images}
        selectedImageId={state.selectedImageId}
        fileInputRef={state.fileInputRef}
        imageSectionRef={state.imageSectionRef}
        contentTextareaRef={state.contentTextareaRef}
        onChangeTitle={state.setTitle}
        onChangeContent={state.setContent}
        onSelectImage={state.handleSelectImage}
        onSelectImageCard={state.setSelectedImageId}
        onDeleteImage={state.handleDeleteImage}
      />

      <Modal
        isOpen={state.showDeleteModal}
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제된 블로그는 다시 확인할 수 없어요."
        cancelText="취소"
        confirmText="삭제하기"
        onClose={() => state.setShowDeleteModal(false)}
        onConfirm={() => void state.handleDeletePost()}
      />

      {state.toastMessage ? (
        <div className="fixed top-[88px] left-1/2 z-50 -translate-x-1/2">
          <Toast message={state.toastMessage} variant={state.toastMessage.includes('저장') || state.toastMessage.includes('삭제') ? 'success' : 'error'} />
        </div>
      ) : null}
    </div>
  );
}
