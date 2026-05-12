import type { PaginationProps } from "./Pagination.types";
import { basePagination, pageButtonBase, pageButtonStyles } from "./Pagination.styled";
import { cn } from "@/utils/cn";
import { NavigateBeforeIcon } from "@/assets/icons";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 0) return null;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={cn(basePagination, className)}>
      <button
        className={cn(
          pageButtonBase,
          currentPage === 1 ? pageButtonStyles.disabled : pageButtonStyles.default,
        )}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <NavigateBeforeIcon width={20} height={20} />
      </button>

      {Array.from({ length: totalPages }, (_, idx) => {
        const page = idx + 1;
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            className={cn(
              pageButtonBase,
              isActive ? pageButtonStyles.active : pageButtonStyles.default,
            )}
            onClick={() => handleClick(page)}
            disabled={isActive}
          >
            {page}
          </button>
        );
      })}

      <button
        className={cn(
          pageButtonBase,
          currentPage === totalPages ? pageButtonStyles.disabled : pageButtonStyles.default,
        )}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NavigateBeforeIcon width={20} height={20} style={{ transform: "scaleX(-1)" }} />
      </button>
    </div>
  );
};

export default Pagination;
