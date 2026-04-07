import { cn } from '@/utils/cn';
import { usePagination } from '@/hooks';

import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  page: number;
  totalPages: number;
  className?: string;
  visibleCount?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  className,
  visibleCount = 5,
  onPageChange,
}: PaginationProps) {
  if (totalPages < 1) {
    return null;
  }

  const {
    currentPage,
    pages,
    isPrevDisabled,
    isNextDisabled,
    moveToPage,
  } = usePagination({
    page,
    totalPages,
    visibleCount,
    onPageChange,
  });

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <PaginationButton
        variant="navigation"
        direction="prev"
        state={isPrevDisabled ? 'disabled' : 'normal'}
        onClick={() => moveToPage(currentPage - 1)}
      />

      {pages.map((targetPage) => (
        <PaginationButton
          key={targetPage}
          variant="page"
          state={targetPage === currentPage ? 'active' : 'normal'}
          onClick={() => moveToPage(targetPage)}
        >
          {targetPage}
        </PaginationButton>
      ))}

      <PaginationButton
        variant="navigation"
        direction="next"
        state={isNextDisabled ? 'disabled' : 'normal'}
        onClick={() => moveToPage(currentPage + 1)}
      />
    </div>
  );
}
