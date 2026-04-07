import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@shared/utils';

type PaginationItem = number | 'ellipsis';

export type PaginationProps = {
  className?: string;
  currentPage: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  totalPages: number;
};

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationItem[] {
  const totalVisibleNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalVisibleNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, siblingCount * 2 + 3);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(totalPages - (siblingCount * 2 + 2), totalPages);
    return [1, 'ellipsis', ...rightRange];
  }

  return [1, 'ellipsis', ...range(leftSiblingIndex, rightSiblingIndex), 'ellipsis', totalPages];
}

type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

function PaginationButton({
  active = false,
  children,
  className,
  disabled,
  type,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex size-[3.2rem] items-center justify-center rounded-full text-[1.4rem] font-medium transition-colors',
        active ? 'bg-[#121212] text-white' : 'bg-transparent text-[#8f8f8f] hover:bg-[#f7f7f7]',
        disabled && 'cursor-not-allowed text-[#d1d1d1] hover:bg-transparent',
        className,
      )}
      disabled={disabled}
      type={type ?? 'button'}
    >
      {children}
    </button>
  );
}

export function Pagination({
  className,
  currentPage,
  onPageChange,
  siblingCount = 1,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems(currentPage, totalPages, siblingCount);

  return (
    <nav aria-label='Pagination' className={cn('flex items-center gap-[0.4rem]', className)}>
      <PaginationButton
        aria-label='Previous page'
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        {'<'}
      </PaginationButton>
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden='true'
            className='inline-flex size-[3.2rem] items-center justify-center text-[1.4rem] text-[#c4c4c4]'
          >
            ...
          </span>
        ) : (
          <PaginationButton
            key={item}
            active={item === currentPage}
            aria-current={item === currentPage ? 'page' : undefined}
            aria-label={`Page ${item}`}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </PaginationButton>
        ),
      )}
      <PaginationButton
        aria-label='Next page'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        {'>'}
      </PaginationButton>
    </nav>
  );
}
