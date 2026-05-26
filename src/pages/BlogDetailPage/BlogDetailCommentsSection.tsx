import { CommentField } from './CommentField';
import { CommentItem } from './CommentItem';
import type { BlogCommentItem } from './useBlogDetailState';

interface BlogDetailCommentsSectionProps {
  comments: BlogCommentItem[];
  isLoggedIn: boolean;
  openedMenuCommentId: number | null;
  commentFieldVariant: 'loggedOut' | 'active' | 'writing';
  commentInput: string;
  onToggleMenu: (commentId: number) => void;
  onDeleteClick: (commentId: number) => void;
  onChangeCommentInput: (value: string) => void;
  onSubmitComment: () => void;
  onRequireLogin: () => void;
}

export function BlogDetailCommentsSection({
  comments,
  isLoggedIn,
  openedMenuCommentId,
  commentFieldVariant,
  commentInput,
  onToggleMenu,
  onDeleteClick,
  onChangeCommentInput,
  onSubmitComment,
  onRequireLogin,
}: BlogDetailCommentsSectionProps) {
  return (
    <section id="comment-section" className="w-full scroll-mt-[82px] border-b border-gray-90 bg-white">
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="mx-auto w-full max-w-[688px]">
          <div className="flex h-[54px] items-center gap-[10px] px-4 py-3">
            <span className="text-base font-medium leading-[160%] tracking-[-0.08px] text-black">댓글</span>
            <span className="text-base font-medium leading-[160%] tracking-[-0.08px] text-primary">{comments.length}</span>
          </div>

          <div className="flex flex-col gap-[10px]">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                id={comment.id}
                author={comment.author}
                dateText={comment.dateText}
                content={comment.content}
                canManage={isLoggedIn && comment.isMine}
                isMenuOpen={openedMenuCommentId === comment.id}
                onToggleMenu={onToggleMenu}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>

          <div className="h-5" aria-hidden="true" />
          <CommentField
            variant={commentFieldVariant}
            value={commentInput}
            onChange={onChangeCommentInput}
            onSubmit={onSubmitComment}
            onRequireLogin={onRequireLogin}
          />
          <div className="h-16" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
