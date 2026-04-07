import type { ReactNode } from 'react';

import { Button } from './Button';
import { Icon } from './Icon';

export interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export function Modal({
  cancelLabel = '취소',
  children,
  confirmLabel = '확인',
  description,
  onClose,
  onConfirm,
  open,
  title,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {description ? <p className="text-sm text-slate-500">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <Icon name="close" />
          </button>
        </div>

        {children ? <div className="mb-6 text-sm text-slate-600">{children}</div> : null}

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          {onConfirm ? <Button onClick={onConfirm}>{confirmLabel}</Button> : null}
        </div>
      </div>
    </div>
  );
}

export default Modal;
