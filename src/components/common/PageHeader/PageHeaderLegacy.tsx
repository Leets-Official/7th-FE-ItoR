import { AddPhotoAlternateIcon, FolderOpenIcon } from '@/assets/icons/common';
import { cn } from '@/utils/cn';

interface PageHeaderLegacyProps {
  className?: string;
}

function PageHeaderLegacy({ className = '' }: PageHeaderLegacyProps) {
  return (
    <div className={cn('flex h-14 w-full items-center justify-center gap-8 bg-white px-4', className)}>
      <button
        type="button"
        className="inline-flex h-[25px] items-center gap-1 rounded-[2px] px-2"
      >
        <span className="flex h-[14px] w-[14px] items-center justify-center">
          <AddPhotoAlternateIcon className="block h-[12.25px] w-[12.25px] text-gray-56 **:fill-current **:stroke-current" />
        </span>
        <span className="whitespace-nowrap text-xs font-normal leading-[160%] tracking-[0] text-gray-56">사진 추가하기</span>
      </button>
      <button
        type="button"
        className="inline-flex h-[25px] items-center gap-1 rounded-[2px] px-2"
      >
        <span className="flex h-[14px] w-[14px] items-center justify-center">
          <FolderOpenIcon className="block h-[12.25px] w-[12.25px] text-gray-56 **:fill-current **:stroke-current" />
        </span>
        <span className="whitespace-nowrap text-xs font-normal leading-[160%] tracking-[0] text-gray-56">파일 추가하기</span>
      </button>
    </div>
  );
}

export default PageHeaderLegacy;
