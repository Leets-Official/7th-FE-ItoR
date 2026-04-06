import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils';

type ButtonVariant =
  | 'outline'
  | 'danger'
  | 'accentOutline'
  | 'neutralOutline'
  | 'neutral'
  | 'dark'
  | 'text';
type ButtonShape = 'rect' | 'pill';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  endIcon?: ReactNode;
  shape?: ButtonShape;
  startIcon?: ReactNode;
  variant?: ButtonVariant;
};

const buttonVariantClassName: Record<ButtonVariant, string> = {
  outline:
    'border border-[#ececec] bg-white text-black disabled:border-[#ececec] disabled:bg-[#f7f7f7] disabled:text-[#b6b6b6]',
  danger: 'bg-[#ff4047] text-white disabled:bg-[#ececec] disabled:text-[#a8a8a8]',
  accentOutline:
    'border border-[#1295ff] bg-white text-[#1295ff] disabled:border-[#d9d9d9] disabled:bg-white disabled:text-[#b6b6b6]',
  neutralOutline:
    'border border-[#9f9f9f] bg-white text-[#8f8f8f] disabled:border-[#d9d9d9] disabled:bg-white disabled:text-[#c4c4c4]',
  neutral: 'bg-[#efefea] text-[#8f8f8f] disabled:bg-[#f4f4ef] disabled:text-[#c8c8c8]',
  dark: 'bg-[#121212] text-white disabled:bg-[#2b2b2b] disabled:text-[#8f8f8f]',
  text: 'bg-transparent text-[#9b9b9b] disabled:text-[#d1d1d1]',
};

const buttonShapeClassName: Record<ButtonShape, string> = {
  rect: 'rounded-[0.2rem]',
  pill: 'rounded-full',
};

export function Button({
  children,
  className,
  endIcon,
  shape = 'rect',
  startIcon,
  type,
  variant = 'outline',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex h-[5.6rem] items-center justify-center gap-[0.8rem] px-[1.6rem] text-[1.8rem] font-medium whitespace-nowrap transition-colors',
        'disabled:cursor-not-allowed',
        '[&_svg]:size-[2rem] [&_svg]:shrink-0',
        buttonVariantClassName[variant],
        buttonShapeClassName[shape],
        className,
      )}
      type={type ?? 'button'}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}
