import { GitlogLogoIcon, ReorderIcon } from '@/assets/icons/common';
import { FC } from 'react';

interface PageHeaderLeftProps {
  onMenuClick: () => void;
  onLogoClick: () => void;
}

const PageHeaderLeft: FC<PageHeaderLeftProps> = ({ onMenuClick, onLogoClick }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <button type="button" aria-label="메뉴 열기" className="flex h-10 w-10 items-center justify-center p-2" onClick={onMenuClick}>
        <ReorderIcon className="h-6 w-6" />
      </button>
      <button type="button" aria-label="홈으로 이동" onClick={onLogoClick}>
        <GitlogLogoIcon className="h-10 w-[77px]" />
      </button>
    </div>
  );
};

export default PageHeaderLeft;
