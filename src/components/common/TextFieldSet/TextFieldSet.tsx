import type { InputHTMLAttributes } from 'react';

import { TextField } from '@/components/common/TextField';
import { cn } from '@/utils/cn';

interface TextFieldSetProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  showHelperText?: boolean;
  helperText?: string;
<<<<<<< HEAD
  helperTone?: 'default' | 'error';
=======
>>>>>>> upstream/최예빈/main
  size?: 14 | 32;
  state?: 'default' | 'input' | 'click' | 'disabled';
}

export function TextFieldSet({
  label = '제목',
  showHelperText = false,
  helperText = '* 주의 문구',
<<<<<<< HEAD
  helperTone = 'default',
=======
>>>>>>> upstream/최예빈/main
  size = 14,
  state = 'default',
  className,
  ...props
}: TextFieldSetProps) {
  return (
<<<<<<< HEAD
    <div className={cn('flex w-full max-w-[688px] flex-col gap-3 px-4 py-3', className)}>
      <label className="w-full px-[6px] text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-56">{label}</label>
      <TextField size={size} state={state} {...props} />
      {showHelperText ? (
        <p
          className={cn(
            'w-full px-[6px] text-xs font-light leading-[160%] tracking-[0]',
            helperTone === 'error' ? 'text-warning' : 'text-gray-78',
          )}
        >
          {helperText}
        </p>
=======
    <div className={cn('flex w-[688px] flex-col gap-1 px-4 py-3', className)}>
      <label className="w-[644px] px-[6px] text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-56">{label}</label>
      <TextField size={size} state={state} {...props} />
      {showHelperText ? (
        <p className="w-[644px] px-[6px] text-xs font-light leading-[160%] tracking-[0] text-gray-56">{helperText}</p>
>>>>>>> upstream/최예빈/main
      ) : null}
    </div>
  );
}
