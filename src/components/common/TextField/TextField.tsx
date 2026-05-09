import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import { textFieldVariants, type TextFieldSize, type TextFieldState } from './TextField.variants';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: TextFieldSize;
  state?: TextFieldState;
}

export function TextField({
  size = 32,
  state = 'default',
  className,
  disabled,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = disabled || state === 'disabled';
  const currentState = isDisabled ? 'disabled' : isFocused ? 'click' : state;

  return (
    <input
      type="text"
      className={cn(textFieldVariants({ size, state: currentState }), className)}
      disabled={isDisabled}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      {...props}
    />
  );
}
