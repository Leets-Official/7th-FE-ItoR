import type { HTMLAttributes, ReactNode } from 'react';

import { Button } from './Button';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger' | 'secondary';
  hideActions?: boolean;
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger' | 'secondary';
}

export function Modal({
  cancelLabel = '취소',
  children,
  className = '',
  confirmLabel = '확인',
  confirmVariant = 'danger',
  hideActions = false,
  open = true,
  subtitle,
  title,
  ...props
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 px-4 py-10">
      <div
        className={[
          'w-full max-w-[440px] overflow-hidden rounded-sm bg-white shadow-[0_18px_40px_rgba(15,23,42,0.14)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <ModalHeader title={title} subtitle={subtitle} />
        {children ? <ModalBody>{children}</ModalBody> : null}
        {hideActions ? null : (
          <ModalFooter
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            confirmVariant={confirmVariant}
          />
        )}
      </div>
    </div>
  );
}

export function ModalHeader({ className = '', subtitle, title, ...props }: ModalHeaderProps) {
  if (!title && !subtitle) return null;

  return (
    <div className={['px-7 pt-7', className].filter(Boolean).join(' ')} {...props}>
      {title ? <h2 className="text-[20px] font-medium leading-7 text-[#3a3a3a]">{title}</h2> : null}
      {subtitle ? <p className="mt-2 text-[14px] leading-6 text-[#9a9a9a]">{subtitle}</p> : null}
    </div>
  );
}

export function ModalBody({ children, className = '', ...props }: ModalBodyProps) {
  return (
    <div className={['px-7 py-5 text-sm text-slate-600', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({
  cancelLabel = '취소',
  className = '',
  confirmLabel = '확인',
  confirmVariant = 'danger',
  ...props
}: ModalFooterProps) {
  return (
    <div
      className={['grid grid-cols-2 gap-4 border-t border-[#f1f1f1] px-7 py-5', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Button variant="cta-outline-muted" className="h-11 rounded-sm border-[#d7d7d7] text-[#7f7f7f]">
        {cancelLabel}
      </Button>
      <Button
        variant={confirmVariant === 'danger' ? 'danger' : confirmVariant === 'secondary' ? 'secondary' : 'primary'}
        className={[
          'h-11 rounded-sm',
          confirmVariant === 'danger' ? 'border-[#ff4b4b] bg-[#ff4b4b] hover:bg-[#ff4040]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {confirmLabel}
      </Button>
    </div>
  );
}

export default Modal;
