import { ChatIcon, CreateIcon, MoreVertIcon } from '@/assets/icons/common';

// 메인 타입 렌더링
export const renderMainType = () => (
  <button
    type="button"
    className="flex h-10 w-[120px] items-center gap-1 rounded-[25px] px-3 py-2 text-sm font-normal leading-[160%] tracking-[-0.07px] text-gray-56 hover:bg-gray-96"
  >
    <span className="flex h-6 w-6 items-center justify-center">
      <CreateIcon className="h-[18px] w-[18px] text-gray-56 [&_*]:fill-current [&_*]:stroke-current" />
    </span>
    <span className="whitespace-nowrap">깃로그 쓰기</span>
  </button>
);

// 상세 타입 렌더링
export const renderDetailType = () => (
  <div className="flex h-10 w-[88px] items-center justify-end gap-2">
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-md text-gray-20 hover:bg-gray-96"
      aria-label="댓글"
    >
      <ChatIcon className="h-5 w-5" />
    </button>
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-md text-gray-20 hover:bg-gray-96"
      aria-label="더보기"
    >
      <MoreVertIcon className="h-4 w-1" />
    </button>
  </div>
);

// 작성 타입 렌더링
export const renderWriteType = () => (
  <div className="flex h-[38px] items-center gap-[10px]">
    <button
      type="button"
      className="flex h-[38px] w-[76px] items-center justify-center text-sm font-normal leading-[160%] tracking-[-0.07px] text-warning"
    >
      삭제하기
    </button>
    <button
      type="button"
      className="flex h-[38px] w-[76px] items-center justify-center text-sm font-normal leading-[160%] tracking-[-0.07px] text-black"
    >
      게시하기
    </button>
  </div>
);
