import type { HTMLAttributes, ReactNode } from 'react';

export interface MenuShellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface MenuItemProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function MenuShell({ children, className = '', ...props }: MenuShellProps) {
  return (
    <div
      className={[
        'inline-flex min-w-[56px] items-center justify-center rounded-md bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.08)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function MenuItem({ active = false, children, className = '', type = 'button', ...props }: MenuItemProps) {
  return (
    <button
      type={type}
      className={[
        'flex w-full items-center rounded-sm px-4 py-2 text-left text-[13px] text-[#2e2e2e] transition-colors',
        active ? 'bg-[#ecece5]' : 'bg-white hover:bg-slate-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenu({ children, className = '', ...props }: DropdownMenuProps) {
  return (
    <div
      className={[
        'inline-flex min-w-[98px] flex-col gap-1 rounded-sm bg-white p-2 shadow-[0_12px_24px_rgba(15,23,42,0.08)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export default MenuShell;
