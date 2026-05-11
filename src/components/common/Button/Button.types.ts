import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ButtonVariantProps } from './Button.variants';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    Omit<ButtonVariantProps, 'state'> {
  children?: ReactNode;
  showIcon?: boolean;
  icon?: ReactNode;
<<<<<<< HEAD
  textClassName?: string;
=======
>>>>>>> upstream/최예빈/main
  pressed?: boolean;
  disabled?: boolean;
}
