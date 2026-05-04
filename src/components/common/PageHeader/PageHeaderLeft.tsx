import { GitlogLogoIcon, ReorderIcon } from '@/assets/icons';

export function PageHeaderLeft() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-md text-gray-20 hover:bg-gray-96"
        aria-label="메뉴"
      >
        <ReorderIcon className="h-5 w-5" />
      </button>
      <GitlogLogoIcon className="h-7 w-[67px]" aria-label="GITLOG 로고" />
    </div>
  );
}

export default PageHeaderLeft;
