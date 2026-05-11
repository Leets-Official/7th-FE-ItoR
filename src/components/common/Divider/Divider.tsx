import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
<<<<<<< HEAD
  direction?: 'horizontal' | 'vertical';
=======
>>>>>>> upstream/최예빈/main
  orientation?: 'horizontal' | 'vertical';
  color?: 'gray90' | 'gray96';
}

export function Divider({
  className,
<<<<<<< HEAD
  direction,
=======
>>>>>>> upstream/최예빈/main
  orientation = 'horizontal',
  color = 'gray96',
  ...props
}: DividerProps) {
<<<<<<< HEAD
  const resolvedDirection = direction ?? orientation;

=======
>>>>>>> upstream/최예빈/main
  return (
    <hr
      className={cn(
        'shrink-0 border-0',
<<<<<<< HEAD
        resolvedDirection === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
=======
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
>>>>>>> upstream/최예빈/main
        color === 'gray90' ? 'bg-gray-90' : 'bg-gray-96',
        className,
      )}
      {...props}
    />
  );
}
