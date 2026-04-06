import {
  createContext,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@shared/utils';

type DropdownAlign = 'start' | 'end';
type DropdownSide = 'bottom';

type DropdownContextValue = {
  align: DropdownAlign;
  open: boolean;
  setOpen: (nextOpen: boolean) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext(componentName: string) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Dropdown.Root`);
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

type DropdownRootProps = {
  align?: DropdownAlign;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DropdownRoot({
  align = 'end',
  children,
  defaultOpen = false,
  open,
  onOpenChange,
}: DropdownRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);

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

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setOpen]);

  const value = useMemo(
    () => ({
      align,
      open: isOpen,
      setOpen,
    }),
    [align, isOpen, setOpen],
  );

  return (
    <DropdownContext.Provider value={value}>
      <div ref={rootRef} className='relative inline-flex'>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownTrigger({ children, onClick, type, ...props }: DropdownTriggerProps) {
  const { open, setOpen } = useDropdownContext('Dropdown.Trigger');

  return (
    <button
      {...props}
      aria-expanded={open}
      aria-haspopup='menu'
      type={type ?? 'button'}
      onClick={composeEventHandlers(onClick, () => setOpen(!open))}
    >
      {children}
    </button>
  );
}

type DropdownContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: DropdownSide;
  withArrow?: boolean;
};

export function DropdownContent({
  children,
  className,
  side = 'bottom',
  withArrow = true,
  ...props
}: DropdownContentProps) {
  const { align, open } = useDropdownContext('Dropdown.Content');

  if (!open) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(
        'absolute top-[calc(100%+0.8rem)] z-20 min-w-[18.4rem] rounded-[0.4rem] bg-white py-[0.8rem] shadow-[0_0.4rem_1.6rem_rgba(17,17,17,0.12)]',
        side === 'bottom' && (align === 'end' ? 'right-0' : 'left-0'),
        className,
      )}
      role='menu'
    >
      {withArrow ? (
        <span
          aria-hidden='true'
          className={cn(
            'absolute top-[-0.6rem] size-[1.2rem] rotate-45 bg-white',
            align === 'end' ? 'right-[1.4rem]' : 'left-[1.4rem]',
          )}
        />
      ) : null}
      <div className='relative z-10 flex flex-col'>{children}</div>
    </div>
  );
}

type DropdownItemProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownItem({ children, className, onClick, type, ...props }: DropdownItemProps) {
  const { setOpen } = useDropdownContext('Dropdown.Item');

  return (
    <button
      {...props}
      className={cn(
        'flex h-[4.8rem] items-center px-[1.6rem] text-left text-[1.6rem] font-normal text-[#111111] transition-colors hover:bg-[#f8f8f8]',
        className,
      )}
      role='menuitem'
      type={type ?? 'button'}
      onClick={composeEventHandlers(onClick, () => setOpen(false))}
    >
      {children}
    </button>
  );
}

type DropdownLinkItemProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function DropdownLinkItem({
  children,
  className,
  onClick,
  ...props
}: DropdownLinkItemProps) {
  const { setOpen } = useDropdownContext('Dropdown.LinkItem');

  return (
    <a
      {...props}
      className={cn(
        'flex h-[4.8rem] items-center px-[1.6rem] text-left text-[1.6rem] font-normal text-[#111111] transition-colors hover:bg-[#f8f8f8]',
        className,
      )}
      role='menuitem'
      onClick={composeEventHandlers(onClick, () => setOpen(false))}
    >
      {children}
    </a>
  );
}
