import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
  color?: 'gray90' | 'gray96';
}

export function Divider({
  className,
  direction,
  orientation = 'horizontal',
  color = 'gray96',
  ...props
}: DividerProps) {
  const resolvedDirection = direction ?? orientation;

  return (
    <hr
      className={cn(
        'shrink-0 border-0',
        resolvedDirection === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        color === 'gray90' ? 'bg-gray-90' : 'bg-gray-96',
        className,
      )}
      {...props}
    />
  );
}
