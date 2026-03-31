import type { HTMLAttributes } from 'react';

export type ToastVariant = 'error' | 'success';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  variant: ToastVariant;
}
