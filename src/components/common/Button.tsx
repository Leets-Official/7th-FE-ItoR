import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'status-error'
  | 'status-success'
  | 'cta-outline'
  | 'cta-outline-muted'
  | 'cta-solid-muted'
  | 'cta-solid-light'
  | 'cta-solid-dark'
  | 'text-muted'
  | 'surface-muted';

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'border-sky-300 bg-sky-200 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-sky-300 active:translate-y-0',
  secondary:
    'border-slate-200 bg-slate-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0',
  outline:
    'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50',
  ghost: 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  danger:
    'border-rose-200 bg-rose-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-rose-600 active:translate-y-0',
  'status-error':
    'rounded-full border-2 border-[#ff6b63] bg-white text-[#ff6b63] shadow-none hover:bg-rose-50',
  'status-success':
    'rounded-full border-2 border-[#4ade80] bg-white text-[#22c55e] shadow-none hover:bg-emerald-50',
  'cta-outline':
    'rounded-full border border-[#1495ff] bg-white text-[#1495ff] shadow-none hover:bg-sky-50',
  'cta-outline-muted':
    'rounded-full border border-[#9b9b9b] bg-white text-[#9b9b9b] shadow-none hover:bg-slate-50',
  'cta-solid-muted':
    'rounded-full border border-[#d8d8d3] bg-[#d8d8d3] text-[#8e8e8e] shadow-none hover:bg-[#d2d2cc]',
  'cta-solid-light':
    'rounded-full border border-[#f6f6f2] bg-[#f6f6f2] text-[#a0a0a0] shadow-none hover:bg-[#efefe8]',
  'cta-solid-dark':
    'rounded-full border border-[#121212] bg-[#121212] text-white shadow-none hover:bg-[#1c1c1c]',
  'text-muted':
    'rounded-none border-transparent bg-transparent px-0 text-[#8f8f8f] shadow-none hover:bg-transparent hover:text-[#6f6f6f]',
  'surface-muted':
    'rounded-none border-transparent bg-[#ecece5] text-[#8f8f8f] shadow-none hover:bg-[#e3e3dc]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5',
  md: 'h-11 px-[18px]',
  lg: 'h-12 px-5 text-base',
  icon: 'h-11 w-11',
};

export function Button({
  children,
  className = '',
  fullWidth = false,
  leftIcon,
  rightIcon,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={[baseStyles, variantStyles[variant], sizeStyles[size], widthClass, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export default Button;
