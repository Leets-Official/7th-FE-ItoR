import clsx from 'clsx';
import { useEffect } from 'react';
import type { HTMLAttributes, MouseEventHandler } from 'react';

import { modalBaseStyle, modalVariantStyle } from './variants';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onClose: () => void;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

export function Modal({
  className,
  isOpen,
  title,
  description,
  cancelText = '취소',
  confirmText = '삭제하기',
  onClose,
  onCancel,
  onConfirm,
  ...props
}: ModalProps) {
  const normalizedDescription = description?.trim() ?? '';
  const hasDescription = normalizedDescription.length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={modalBaseStyle.overlay}
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className={clsx(
          modalBaseStyle.panel,
          hasDescription
            ? modalVariantStyle.withDescription
            : modalVariantStyle.withoutDescription,
          className,
        )}
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        <div className={modalBaseStyle.content}>
          <div className={modalBaseStyle.textGroup}>
            <p className={modalBaseStyle.title}>{title}</p>
            {hasDescription ? (
              <p className={modalBaseStyle.description}>{normalizedDescription}</p>
            ) : null}
          </div>
          <div className={modalBaseStyle.actionGroup}>
            <button
              type="button"
              className={clsx(
                modalBaseStyle.actionButton,
                modalVariantStyle.cancel,
              )}
              onClick={(event) => {
                onCancel?.(event);
                onClose();
              }}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={clsx(
                modalBaseStyle.actionButton,
                modalVariantStyle.confirm,
              )}
              onClick={(event) => {
                onConfirm?.(event);
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
