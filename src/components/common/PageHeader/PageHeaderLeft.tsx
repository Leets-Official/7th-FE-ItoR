import { GitlogLogoIcon, ReorderIcon } from '@/assets/icons/common';
import { FC } from 'react';

const PageHeaderLeft: FC = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <button type="button" aria-label="메뉴 열기" className="flex h-10 w-10 items-center justify-center p-2">
        <ReorderIcon className="h-6 w-6" />
      </button>
      <GitlogLogoIcon className="h-10 w-[77px]" />
    </div>
  );
};

export default PageHeaderLeft;
