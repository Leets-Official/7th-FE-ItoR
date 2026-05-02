import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

const blankVariants = cva('w-full max-w-[688px] bg-white', {
  variants: {
    size: {
      20: 'h-5',
      32: 'h-8',
      64: 'h-16',
    },
  },
  defaultVariants: {
    size: 20,
  },
});

interface BlankProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof blankVariants> {}

export function Blank({
  className,
  size,
  ...props
}: BlankProps) {
  return (
    <div
      className={cn(blankVariants({ size }), className)}
      aria-hidden="true"
      {...props}
    />
  );
}
