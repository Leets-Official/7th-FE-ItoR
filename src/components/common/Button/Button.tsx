import { CreateIcon } from '@/assets/icons';
import { cn } from '@/utils/cn';

import { buttonIconVariants, buttonTextVariants, buttonVariants } from './Button.variants';
import type { ButtonProps } from './Button.types';

export function Button({
  children,
  className,
  type = 'button',
  size = 'regular',
  intent = 'primary',
  pressed = false,
  showIcon = true,
  icon = <CreateIcon aria-hidden="true" />,
  disabled = false,
  ...props
}: ButtonProps) {
  const state = disabled ? (pressed ? 'disabledFilled' : 'disabled') : pressed ? 'pressed' : 'default';

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({
          size,
          intent,
          state,
        }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {showIcon && icon && (
        <span
          className={buttonIconVariants({ size })}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children ? <span className={buttonTextVariants({ size })}>{children}</span> : null}
    </button>
  );
}
