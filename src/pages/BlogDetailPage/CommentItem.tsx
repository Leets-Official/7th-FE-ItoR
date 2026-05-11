import { MoreVertIcon } from '@/assets/icons/common';
import { Profile } from '@/components/common/Profile';

interface CommentItemProps {
  id: number;
  author: string;
  dateText: string;
  content: string;
  canManage: boolean;
  isMenuOpen: boolean;
  onToggleMenu: (commentId: number) => void;
  onDeleteClick: (commentId: number) => void;
}

export function CommentItem({
  id,
  author,
  dateText,
  content,
  canManage,
  isMenuOpen,
  onToggleMenu,
  onDeleteClick,
}: CommentItemProps) {
  return (
    <div className="relative w-full max-w-[688px] bg-white px-4 py-3">
      <div className="w-full bg-white px-4 py-3">
        <div className="flex items-start justify-between">
          <div className="flex h-[41px] items-start gap-[6px]">
            <Profile size={2} className="h-5 w-5" />
            <div className="flex h-[41px] flex-col">
              <span className="text-sm font-light leading-[160%] tracking-[-0.5%] text-gray-20">{author}</span>
              <span className="text-xs font-light leading-[160%] tracking-[0] text-gray-56">{dateText}</span>
            </div>
          </div>
          {canManage ? (
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center text-gray-20"
              aria-label="댓글 더보기"
              onClick={(event) => {
                event.stopPropagation();
                onToggleMenu(id);
              }}
            >
              <MoreVertIcon className="h-4 w-1" />
            </button>
          ) : null}
        </div>

        <div className="mt-4 ml-[26px] w-[calc(100%-26px)]">
          <p className="text-sm font-light leading-[160%] tracking-[-0.5%] text-gray-33">{content}</p>
        </div>
      </div>

      {canManage && isMenuOpen ? (
        <div
          className="absolute top-[58px] right-8 z-10 flex h-[50px] w-40 items-center rounded-[4px] bg-white px-3 py-1 shadow-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="flex h-[22px] w-[136px] items-center px-1 text-left text-sm font-regular leading-[160%] tracking-[-0.5%] text-black"
            onClick={(event) => {
              event.stopPropagation();
              onDeleteClick(id);
            }}
          >
            삭제하기
          </button>
        </div>
      ) : null}
    </div>
  );
}
