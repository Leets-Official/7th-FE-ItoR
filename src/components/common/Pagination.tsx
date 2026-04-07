import { Button } from './Button';
import { Icon } from './Icon';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

function getVisiblePages(currentPage: number, totalPages: number, siblingCount: number) {
  const pages = new Set<number>([1, totalPages]);

  for (let page = currentPage - siblingCount; page <= currentPage + siblingCount; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function Pagination({
  currentPage,
  onPageChange,
  siblingCount = 1,
  totalPages,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages, siblingCount);

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <Button
        size="icon"
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <Icon name="chevron-left" />
      </Button>

      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const shouldShowGap = previousPage && page - previousPage > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {shouldShowGap ? <span className="px-1 text-slate-400">...</span> : null}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                'flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors',
                page === currentPage
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100',
              ].join(' ')}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </span>
        );
      })}

      <Button
        size="icon"
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <Icon name="chevron-right" />
      </Button>
    </nav>
  );
}

export default Pagination;
