import type { HTMLAttributes, ReactNode } from 'react';

type TagVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  leading?: ReactNode;
}

const tagStyles: Record<TagVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  accent: 'bg-sky-100 text-sky-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-rose-100 text-rose-800',
};

export function Tag({ children, className = '', leading, variant = 'default', ...props }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tagStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leading}
      {children}
    </span>
  );
}

export default Tag;
