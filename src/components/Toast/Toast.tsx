import clsx from 'clsx';

import type { ToastProps } from './types';
import { toastBaseStyle, toastVariantStyle } from './variants';

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
        <variantStyle.Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <span className={toastBaseStyle.text}>
        {message}
      </span>
    </div>
  );
}
