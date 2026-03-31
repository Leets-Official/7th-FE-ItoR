import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { toastBaseStyle, toastVariantStyle } from './variants';

export type ToastVariant = 'error' | 'success';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  variant: ToastVariant;
}

export function Toast({
  className,
  message,
  variant,
  ...props
}: ToastProps) {
  const variantStyle = toastVariantStyle[variant];

  return (
    <div
      className={clsx(toastBaseStyle.root, variantStyle.color, className)}
      role={variantStyle.role}
      {...props}
    >
      <span className={toastBaseStyle.icon}>
        <variantStyle.Icon aria-hidden="true" className="block h-full w-full" />
      </span>
      <span className={toastBaseStyle.text}>
        {message}
      </span>
    </div>
  );
}
