import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@shared/utils';

type TextFieldBaseProps = {
  className?: string;
  error?: string;
  helperText?: string;
  label?: ReactNode;
  state?: 'default' | 'error';
};

type TextFieldInputProps = TextFieldBaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextFieldTextareaProps = TextFieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

export type TextFieldProps = TextFieldInputProps | TextFieldTextareaProps;

function getMessage(error?: string, helperText?: string) {
  if (error) {
    return error;
  }

  return helperText;
}

const fieldClassName =
  'w-full rounded-[0.2rem] border bg-white px-[1.6rem] text-[1.4rem] leading-[1.5] text-[#111111] outline-none transition-colors placeholder:text-[#c4c4c4]';

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  function TextField(
    {
      className,
      disabled,
      error,
      helperText,
      label,
      multiline = false,
      state = 'default',
      ...props
    },
    ref,
  ) {
    const message = getMessage(error, helperText);
    const describedBy = message ? `${props.id ?? props.name ?? 'text-field'}-message` : undefined;
    const hasError = state === 'error' || Boolean(error);
    const stateClassName = hasError
      ? 'border-[#ff5b61] focus:border-[#ff5b61]'
      : 'border-[#ececec] focus:border-[#111111]';

    return (
      <label className={cn('flex w-full flex-col gap-[0.8rem]', className)}>
        {label ? (
          <span className='text-[1.2rem] leading-none font-medium text-[#111111]'>{label}</span>
        ) : null}
        {multiline ? (
          <textarea
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={ref as Ref<HTMLTextAreaElement>}
            aria-describedby={describedBy}
            aria-invalid={hasError}
            className={cn(
              fieldClassName,
              'min-h-[12rem] resize-none py-[1.4rem]',
              stateClassName,
              disabled && 'cursor-not-allowed bg-[#f7f7f7] text-[#b6b6b6]',
            )}
            disabled={disabled}
          />
        ) : (
          <input
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            ref={ref as Ref<HTMLInputElement>}
            aria-describedby={describedBy}
            aria-invalid={hasError}
            className={cn(
              fieldClassName,
              'h-[4.8rem]',
              stateClassName,
              disabled && 'cursor-not-allowed bg-[#f7f7f7] text-[#b6b6b6]',
            )}
            disabled={disabled}
          />
        )}
        {message ? (
          <span
            className={cn(
              'text-[1.2rem] leading-[1.4] text-[#8f8f8f]',
              hasError && 'text-[#ff5b61]',
            )}
            id={describedBy}
          >
            {message}
          </span>
        ) : null}
      </label>
    );
  },
);
