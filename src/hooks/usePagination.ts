import { useCallback, useMemo } from 'react';

interface UsePaginationParams {
  page: number;
  totalPages: number;
  visibleCount: number;
  onPageChange?: (page: number) => void;
}

function getVisiblePages(currentPage: number, totalPages: number, visibleCount: number) {
  if (totalPages <= visibleCount) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + visibleCount - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - visibleCount + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function usePagination({
  page,
  totalPages,
  visibleCount,
  onPageChange,
}: UsePaginationParams) {
  const currentPage = useMemo(
    () => Math.min(Math.max(page, 1), totalPages),
    [page, totalPages],
  );

  const pages = useMemo(
    () => getVisiblePages(currentPage, totalPages, visibleCount),
    [currentPage, totalPages, visibleCount],
  );

  const moveToPage = useCallback(
    (nextPage: number) => {
      if (!onPageChange) {
        return;
      }

      onPageChange(Math.min(Math.max(nextPage, 1), totalPages));
    },
    [onPageChange, totalPages],
  );

  return {
    currentPage,
    pages,
    isPrevDisabled: currentPage <= 1,
    isNextDisabled: currentPage >= totalPages,
    moveToPage,
  };
}
