import { ChatIcon, CreateIcon, MoreVertIcon } from '@/assets/icons/common';
import type { PageHeaderActionProps } from './types';

// 메인 타입 렌더링
export const renderMainType = ({ onWriteClick }: PageHeaderActionProps) => (
  <button
    type="button"
    className="flex h-10 w-[120px] items-center gap-1 rounded-[25px] px-3 py-2 text-sm font-normal leading-[160%] tracking-[-0.07px] text-gray-56 hover:bg-gray-96"
    onClick={onWriteClick}
  >
    <span className="flex h-6 w-6 items-center justify-center">
      <CreateIcon className="h-[18px] w-[18px] text-gray-56 [&_*]:fill-current [&_*]:stroke-current" />
    </span>
    <span className="whitespace-nowrap">깃로그 쓰기</span>
  </button>
);

// 상세 타입 렌더링
export const renderDetailType = ({
  onCommentClick,
  canManagePost = false,
  isPostMenuOpen = false,
  onTogglePostMenu,
  onEditPost,
  onDeletePost,
}: PageHeaderActionProps) => (
  <div className="relative flex h-10 items-center justify-end gap-2">
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-md text-gray-20 hover:bg-gray-96"
      aria-label="댓글"
      onClick={onCommentClick}
    >
      <ChatIcon className="h-5 w-5" />
    </button>
    {canManagePost ? (
      <>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-gray-20 hover:bg-gray-96"
          aria-label="더보기"
          onClick={(event) => {
            event.stopPropagation();
            onTogglePostMenu?.();
          }}
        >
          <MoreVertIcon className="h-4 w-1" />
        </button>
        {isPostMenuOpen ? (
          <div
            className="absolute top-[46px] right-0 z-20 w-40 rounded-[4px] bg-white pt-2 pr-3 pb-3 pl-3 shadow-dropdown"
            onClick={(event) => event.stopPropagation()}
          >
            <span
              aria-hidden="true"
              className="absolute top-[-8px] right-[7px] h-2 w-4 bg-white [clip-path:polygon(50%_0,0_100%,100%_100%)]"
            />
            <div className="flex flex-col">
              <button
                type="button"
                className="flex h-[42px] w-full items-center text-left text-sm font-regular leading-[160%] tracking-[-0.07px] text-black"
                onClick={onEditPost}
              >
                수정하기
              </button>
              <button
                type="button"
                className="flex h-[42px] w-full items-center text-left text-sm font-regular leading-[160%] tracking-[-0.07px] text-warning"
                onClick={onDeletePost}
              >
                삭제하기
              </button>
            </div>
          </div>
        ) : null}
      </>
    ) : null}
  </div>
);

// 작성 타입 렌더링
export const renderWriteType = ({ onDeletePost, onSubmitPost }: PageHeaderActionProps) => (
  <div className="flex h-[38px] items-center gap-[10px]">
    <button
      type="button"
      className="flex h-[38px] w-[76px] items-center justify-center text-sm font-normal leading-[160%] tracking-[-0.07px] text-warning"
      onClick={onDeletePost}
    >
      삭제하기
    </button>
    <button
      type="button"
      className="flex h-[38px] w-[76px] items-center justify-center text-sm font-normal leading-[160%] tracking-[-0.07px] text-black"
      onClick={onSubmitPost}
    >
      게시하기
    </button>
  </div>
);
