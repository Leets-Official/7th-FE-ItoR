import { PageHeader } from '@/components/common/PageHeader';
import { useParams } from 'react-router-dom';
import { BlogTitleSection } from './BlogTitleSection';
import { BlogDetailBodySection } from './BlogDetailBodySection';
import { BlogDetailCommentsSection } from './BlogDetailCommentsSection';
import { BlogDetailFooterProfile } from './BlogDetailFooterProfile';
import { BlogDetailOverlays } from './BlogDetailOverlays';
import { useBlogDetailState } from './useBlogDetailState';

export function BlogDetailPage() {
  const { id } = useParams();
  const postId = id ?? null;
  const state = useBlogDetailState(postId);

  return (
    <div className="min-h-screen bg-gray-96">
      <div className="w-full bg-white">
        <PageHeader
          type="detail"
          className="h-[72px] border-b border-gray-90 px-4 py-4"
          onCommentClick={state.handleCommentButtonClick}
          canManagePost={state.isPostAuthor}
          isPostMenuOpen={state.isPostMenuOpen}
          onTogglePostMenu={() => state.setIsPostMenuOpen((prev) => !prev)}
          onEditPost={() => postId && state.navigate(`/blog/${postId}/edit`)}
          onDeletePost={() => state.setIsPostDeleteModalOpen(true)}
        />
      </div>

      <BlogTitleSection
        title={state.apiPost?.title ?? state.post?.title ?? '32 Title one line'}
        author={state.apiPost?.authorNickname ?? state.post?.authorNickname ?? '닉네임'}
        dateText={state.apiPost?.createdAt ?? state.post?.createdAt ?? 'Fed 17. 2025.'}
        commentCount={state.comments.length}
      />

      <BlogDetailBodySection content={state.apiPost?.content ?? state.post?.content ?? ''} contents={state.apiPost?.contents} />

      <BlogDetailCommentsSection
        comments={state.comments}
        isLoggedIn={state.isLoggedIn}
        openedMenuCommentId={state.openedMenuCommentId}
        commentFieldVariant={state.commentFieldVariant}
        commentInput={state.commentInput}
        onToggleMenu={(commentId) => state.setOpenedMenuCommentId((prev) => (prev === commentId ? null : commentId))}
        onDeleteClick={(commentId) => {
          state.setDeleteTargetCommentId(commentId);
          state.setIsCommentDeleteModalOpen(true);
          state.setOpenedMenuCommentId(null);
        }}
        onChangeCommentInput={state.setCommentInput}
        onSubmitComment={() => void state.handleSubmitComment()}
        onRequireLogin={() => state.navigate('/login')}
      />

      <BlogDetailFooterProfile />

      <BlogDetailOverlays
        isCommentDeleteModalOpen={state.isCommentDeleteModalOpen}
        isPostDeleteModalOpen={state.isPostDeleteModalOpen}
        isDeleting={state.isDeleting}
        toastMessage={state.toastMessage}
        onCloseCommentModal={() => {
          if (state.isDeleting) return;
          state.setIsCommentDeleteModalOpen(false);
          state.setDeleteTargetCommentId(null);
        }}
        onConfirmCommentDelete={() => void state.handleDeleteConfirm()}
        onClosePostModal={() => {
          if (state.isDeleting) return;
          state.setIsPostDeleteModalOpen(false);
        }}
        onConfirmPostDelete={() => void state.handleDeletePostConfirm()}
      />
    </div>
  );
}
