import {
  createContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@shared/utils';

type ModalContextValue = {
  open: boolean;
  setOpen: (nextOpen: boolean) => void;
  titleId?: string;
  setTitleId: (titleId?: string) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(componentName: string) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Modal.Root`);
  }

  return context;
}

function composeEventHandlers<E>(
  originalHandler: ((event: E) => void) | undefined,
  nextHandler: (event: E) => void,
) {
  return (event: E) => {
    originalHandler?.(event);
    nextHandler(event);
  };
}

type ModalRootProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ModalRoot({ children, defaultOpen = false, open, onOpenChange }: ModalRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [titleId, setTitleId] = useState<string>();

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setOpen]);

  return (
    <ModalContext.Provider value={{ open: isOpen, setOpen, titleId, setTitleId }}>
      {children}
    </ModalContext.Provider>
  );
}

type TriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ModalTrigger({ children, onClick, type, ...props }: TriggerProps) {
  const { setOpen } = useModalContext('Modal.Trigger');

  return (
    <button
      {...props}
      type={type ?? 'button'}
      onClick={composeEventHandlers(onClick, () => setOpen(true))}
    >
      {children}
    </button>
  );
}

type PortalProps = {
  children: ReactNode;
};

export function ModalPortal({ children }: PortalProps) {
  const { open } = useModalContext('Modal.Portal');

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}

type OverlayProps = HTMLAttributes<HTMLDivElement>;

export function ModalOverlay({ className, onClick, ...props }: OverlayProps) {
  const { open, setOpen } = useModalContext('Modal.Overlay');

  if (!open) {
    return null;
  }

  return (
    <div
      {...props}
      aria-hidden='true'
      className={cn('fixed inset-0 z-40 bg-black/55 backdrop-blur-[0.2rem]', className)}
      onClick={composeEventHandlers(onClick, () => setOpen(false))}
    />
  );
}

type ContentProps = HTMLAttributes<HTMLDivElement>;

export function ModalContent({ className, children, onClick, ...props }: ContentProps) {
  const { open, titleId } = useModalContext('Modal.Content');

  if (!open) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-[1.6rem] sm:p-[2.4rem]'>
      <div
        {...props}
        aria-labelledby={titleId}
        aria-modal='true'
        className={cn(
          'w-full max-w-[51.2rem] rounded-[1.6rem] bg-white p-[2.4rem] shadow-[0_2.4rem_8rem_rgba(15,23,42,0.24)]',
          className,
        )}
        role='dialog'
        onClick={composeEventHandlers(onClick, (event: MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
        })}
      >
        {children}
      </div>
    </div>
  );
}

type SectionProps = HTMLAttributes<HTMLDivElement>;

export function ModalHeader({ className, ...props }: SectionProps) {
  return (
    <div {...props} className={cn('flex items-start justify-between gap-[1.6rem]', className)} />
  );
}

export function ModalBody({ className, ...props }: SectionProps) {
  return <div {...props} className={cn('mt-[1.6rem] text-[1.4rem] text-slate-600', className)} />;
}

export function ModalFooter({ className, ...props }: SectionProps) {
  return <div {...props} className={cn('mt-[2.4rem] flex justify-end gap-[0.8rem]', className)} />;
}

type TitleProps = HTMLAttributes<HTMLHeadingElement>;

export function ModalTitle({ className, ...props }: TitleProps) {
  const { setTitleId } = useModalContext('Modal.Title');
  const generatedId = useId();

  useEffect(() => {
    setTitleId(generatedId);

    return () => {
      setTitleId(undefined);
    };
  }, [generatedId, setTitleId]);

  return (
    <h2
      {...props}
      className={cn('text-[1.8rem] font-semibold text-slate-900', className)}
      id={generatedId}
    />
  );
}

type CloseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ModalClose({ children, onClick, type, ...props }: CloseProps) {
  const { setOpen } = useModalContext('Modal.Close');

  return (
    <button
      {...props}
      aria-label={props['aria-label'] ?? 'Close modal'}
      type={type ?? 'button'}
      onClick={composeEventHandlers(onClick, () => setOpen(false))}
    >
      {children}
    </button>
  );
}
