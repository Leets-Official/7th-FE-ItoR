import {
  Children,
  cloneElement,
  isValidElement,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { IconButton } from '@shared/ui/button';
import { cn } from '@shared/utils';

type SlotProps = {
  children: ReactElement;
  className?: string;
};

function Slot({ children, className }: SlotProps) {
  const child = Children.only(children) as ReactElement<{ className?: string }>;

  if (!isValidElement(child)) {
    return null;
  }

  return cloneElement(child, {
    className: cn(child.props.className, className),
  });
}

type HeaderRootProps = HTMLAttributes<HTMLElement>;

export function HeaderRoot({ className, ...props }: HeaderRootProps) {
  return (
    <header
      {...props}
      className={cn(
        'flex min-h-[4rem] items-center justify-between bg-white px-[1.2rem] py-[0.6rem]',
        className,
      )}
    />
  );
}

type HeaderGroupProps = HTMLAttributes<HTMLDivElement>;

export function HeaderLeft({ className, ...props }: HeaderGroupProps) {
  return <div {...props} className={cn('flex min-w-0 items-center gap-[0.8rem]', className)} />;
}

export function HeaderRight({ className, ...props }: HeaderGroupProps) {
  return <div {...props} className={cn('flex items-center gap-[0.4rem]', className)} />;
}

type HeaderBrandProps = {
  asChild?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function HeaderBrand({ asChild = false, children, className, ...props }: HeaderBrandProps) {
  const brandClassName = cn(
    'truncate text-[1.3rem] font-semibold italic tracking-[-0.03em] text-[#111111]',
    className,
  );

  if (asChild && isValidElement(children)) {
    return <Slot className={brandClassName}>{children}</Slot>;
  }

  return (
    <div {...props} className={brandClassName}>
      {children}
    </div>
  );
}

type HeaderMenuButtonProps = Omit<
  ComponentPropsWithoutRef<typeof IconButton>,
  'shape' | 'size' | 'variant'
>;

export function HeaderMenuButton({ className, ...props }: HeaderMenuButtonProps) {
  return (
    <IconButton
      {...props}
      className={cn('text-[#8f8f8f]', className)}
      shape='square'
      size='md'
      variant='ghost'
    />
  );
}

type HeaderActionTextCommonProps = {
  asChild?: boolean;
  children: ReactNode;
  tone?: 'default' | 'danger';
};

type HeaderActionButtonProps = HeaderActionTextCommonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
type HeaderActionLinkProps = HeaderActionTextCommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

function getActionTextClassName(tone: 'default' | 'danger', className?: string) {
  return cn(
    'inline-flex items-center justify-center text-[1.1rem] font-medium leading-none transition-colors',
    tone === 'danger' ? 'text-[#ff5b61]' : 'text-[#111111]',
    className,
  );
}

export function HeaderActionButton({
  asChild = false,
  children,
  className,
  tone = 'default',
  type,
  ...props
}: HeaderActionButtonProps) {
  const actionClassName = getActionTextClassName(tone, className);

  if (asChild && isValidElement(children)) {
    return <Slot className={actionClassName}>{children}</Slot>;
  }

  return (
    <button {...props} className={actionClassName} type={type ?? 'button'}>
      {children}
    </button>
  );
}

export function HeaderActionLink({
  asChild = false,
  children,
  className,
  tone = 'default',
  ...props
}: HeaderActionLinkProps) {
  const actionClassName = getActionTextClassName(tone, className);

  if (asChild && isValidElement(children)) {
    return <Slot className={actionClassName}>{children}</Slot>;
  }

  return (
    <a {...props} className={actionClassName}>
      {children}
    </a>
  );
}
