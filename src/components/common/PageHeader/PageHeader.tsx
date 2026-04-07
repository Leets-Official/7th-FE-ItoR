import PageHeaderLeft from '@/components/common/PageHeader/PageHeaderLeft';
import PageHeaderRight from '@/components/common/PageHeader/PageHeaderRight';
import { cn } from '@/utils/cn';
import type { PageHeaderType } from './types';

interface PageHeaderProps {
  className?: string;
  type: PageHeaderType;
}

function PageHeader({ className = '', type }: PageHeaderProps) {
  return (
    <header className={cn('flex h-[74px] w-full items-center justify-between bg-white px-4 py-3', className)}>
      <PageHeaderLeft />
      <PageHeaderRight type={type} />
    </header>
  );
}

export default PageHeader;
