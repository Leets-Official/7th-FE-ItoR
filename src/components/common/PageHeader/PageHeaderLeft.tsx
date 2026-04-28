import { GitlogLogoIcon, ReorderIcon } from '@/assets/icons/common';
import { FC } from 'react';

const PageHeaderLeft: FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-2.5">
        <ReorderIcon />
        <GitlogLogoIcon className="h-[37px] w-[97px]" />
      </div>
    </div>
  );
};

export default PageHeaderLeft;
