import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type PaginationButtonState = 'normal' | 'active' | 'disabled';
type PaginationButtonVariant = 'navigation' | 'page';
type PaginationDirection = 'prev' | 'next';

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: PaginationButtonVariant;
  state?: PaginationButtonState;
  direction?: PaginationDirection;
  children?: ReactNode;
}

const paginationButtonBaseClass =
  'flex h-8 w-8 items-center justify-center rounded-sm border text-sm font-regular leading-[22px] tracking-[-0.07px]';

const paginationButtonStateClassMap: Record<PaginationButtonState, string> = {
  normal: 'border-gray-90 bg-white text-character-title',
  active: 'border-primary bg-white text-primary',
  disabled: 'cursor-not-allowed border-gray-90 bg-gray-96 text-character-disabled',
};

export function PaginationButton({
  variant,
  state = 'normal',
  direction = 'prev',
  children,
  className,
  disabled,
  ...props
}: PaginationButtonProps) {
  const isDisabled = disabled || state === 'disabled';

  return (
    <button
      type="button"
      className={cn(
        paginationButtonBaseClass,
        paginationButtonStateClassMap[state],
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {variant === 'navigation' ? (
        <span className="flex h-3 w-3 items-center justify-center">
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={direction === 'prev' ? 'M7.5 2.5L4.5 6L7.5 9.5' : 'M4.5 2.5L7.5 6L4.5 9.5'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
