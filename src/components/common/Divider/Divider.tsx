import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  color?: 'gray90' | 'gray96';
}

export function Divider({
  className,
  orientation = 'horizontal',
  color = 'gray96',
  ...props
}: DividerProps) {
  return (
    <hr
      className={cn(
        'shrink-0 border-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        color === 'gray90' ? 'bg-gray-90' : 'bg-gray-96',
        className,
      )}
      {...props}
    />
  );
}
