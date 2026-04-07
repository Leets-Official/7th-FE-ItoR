import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { DoneIcon, ErrorOutlineIcon } from '@/assets/icons';

import { toastVariants } from './Toast.variants';

export type ToastVariant = 'error' | 'success';
const TOAST_ICONS = {
  error: ErrorOutlineIcon,
  success: DoneIcon,
} as const;
const TOAST_ROLE = {
  error: 'alert',
  success: 'status',
} as const;

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
  const styles = toastVariants({ tone: variant });
  const { icon, root, text } = styles;
  const Icon = TOAST_ICONS[variant];

  return (
    <div
      className={clsx(root(), className)}
      role={TOAST_ROLE[variant]}
      {...props}
    >
      <span className={icon()}>
        <Icon aria-hidden="true" className="block h-full w-full" />
      </span>
      <span className={text()}>
        {message}
      </span>
    </div>
  );
}
