import { useEffect } from 'react';
import type { HTMLAttributes, MouseEventHandler } from 'react';

import { cn } from '@/utils/cn';

import { modalStyleMap, modalStyles } from './Modal.styles';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onClose: () => void;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  confirmTone?: 'confirm' | 'primary';
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
  confirmTone = 'confirm',
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
      className={modalStyles.overlay}
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className={cn(
          modalStyles.panel,
          hasDescription
            ? modalStyleMap.description.withDescription
            : modalStyleMap.description.withoutDescription,
          className,
        )}
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        <div className={modalStyles.content}>
          <div className={modalStyles.textGroup}>
            <p className={modalStyles.title}>{title}</p>
            {hasDescription ? (
              <p className={modalStyles.description}>{normalizedDescription}</p>
            ) : null}
          </div>
          <div className={modalStyles.actionGroup}>
            <button
              type="button"
              className={cn(
                modalStyles.actionButton,
                modalStyleMap.actionTone.cancel,
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
              className={cn(
                modalStyles.actionButton,
                modalStyleMap.actionTone[confirmTone],
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
