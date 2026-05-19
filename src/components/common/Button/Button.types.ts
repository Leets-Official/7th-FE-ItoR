import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ButtonVariantProps } from './Button.variants';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    Omit<ButtonVariantProps, 'state'> {
  children?: ReactNode;
  showIcon?: boolean;
  icon?: ReactNode;
  textClassName?: string;
  pressed?: boolean;
  disabled?: boolean;
}
