import { ReorderIcon } from '@/assets/icons/common';
import { FC } from 'react';

const PageHeaderLeft: FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-2.5">
        <ReorderIcon />
        <div
          className="flex items-center justify-center px-1.5 py-1.5 text-xl font-normal leading-[140%] text-black"
          style={{ fontFamily: 'Smooch, cursive' }}
        >
          Gitlog
        </div>
      </div>
    </div>
  );
};

export default PageHeaderLeft;