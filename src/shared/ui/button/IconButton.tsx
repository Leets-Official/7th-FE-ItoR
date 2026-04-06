import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils';

type IconButtonVariant = 'ghost' | 'outline' | 'danger';
type IconButtonSize = 'md' | 'lg';
type IconButtonShape = 'square' | 'circle';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  'aria-label': string;
  icon: ReactNode;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  variant?: IconButtonVariant;
};

const iconButtonVariantClassName: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-black',
  outline: 'border border-[#ececec] bg-white text-black',
  danger: 'bg-[#ff4047] text-white',
};

const iconButtonSizeClassName: Record<IconButtonSize, string> = {
  md: 'size-[4rem]',
  lg: 'size-[5.6rem]',
};

const iconButtonShapeClassName: Record<IconButtonShape, string> = {
  square: 'rounded-[0.8rem]',
  circle: 'rounded-full',
};

export function IconButton({
  className,
  icon,
  shape = 'square',
  size = 'md',
  type,
  variant = 'ghost',
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        '[&_svg]:size-[2rem]',
        iconButtonVariantClassName[variant],
        iconButtonSizeClassName[size],
        iconButtonShapeClassName[shape],
        className,
      )}
      type={type ?? 'button'}
    >
      {icon}
    </button>
  );
}
