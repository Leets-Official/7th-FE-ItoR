import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils';

type ListSpacing = 0 | 8 | 12 | 16 | 20 | 24;

const spacingClassName: Record<ListSpacing, string> = {
  0: 'gap-0',
  8: 'gap-[0.8rem]',
  12: 'gap-[1.2rem]',
  16: 'gap-[1.6rem]',
  20: 'gap-[2rem]',
  24: 'gap-[2.4rem]',
};

type ListRootProps = HTMLAttributes<HTMLUListElement> & {
  children: ReactNode;
  spacing?: ListSpacing;
  withDivider?: boolean;
};

export function ListRoot({
  children,
  className,
  spacing = 0,
  withDivider = false,
  ...props
}: ListRootProps) {
  return (
    <ul
      {...props}
      className={cn(
        'flex flex-col',
        spacingClassName[spacing],
        withDivider && 'divide-y divide-[#f0f0f0]',
        className,
      )}
    >
      {children}
    </ul>
  );
}

type ListItemProps = HTMLAttributes<HTMLLIElement> & {
  children: ReactNode;
};

export function ListItem({ children, className, ...props }: ListItemProps) {
  return (
    <li {...props} className={cn('list-none', className)}>
      {children}
    </li>
  );
}

type ListRowProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ListRow({ children, className, ...props }: ListRowProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center justify-between gap-[1.2rem] px-[0.4rem] py-[1.6rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}

type ListContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ListContent({ children, className, ...props }: ListContentProps) {
  return (
    <div {...props} className={cn('flex min-w-0 flex-1 flex-col gap-[0.4rem]', className)}>
      {children}
    </div>
  );
}

type ListTitleProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ListTitle({ children, className, ...props }: ListTitleProps) {
  return (
    <div
      {...props}
      className={cn('truncate text-[1.6rem] leading-[1.4] font-medium text-[#111111]', className)}
    >
      {children}
    </div>
  );
}

type ListDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function ListDescription({ children, className, ...props }: ListDescriptionProps) {
  return (
    <p
      {...props}
      className={cn('text-[1.4rem] leading-[1.5] font-normal text-[#8f8f8f]', className)}
    >
      {children}
    </p>
  );
}

type ListRightProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ListRight({ children, className, ...props }: ListRightProps) {
  return (
    <div {...props} className={cn('flex shrink-0 items-center gap-[0.8rem]', className)}>
      {children}
    </div>
  );
}
