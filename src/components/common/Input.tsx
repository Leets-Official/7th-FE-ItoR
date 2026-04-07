import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', error, helperText, id, label, leftAddon, rightAddon, ...props },
  ref,
) {
  const message = error ?? helperText;
  const messageColor = error ? 'text-rose-500' : 'text-slate-500';

  return (
    <label htmlFor={id} className="flex w-full flex-col gap-2 text-sm text-slate-700">
      {label ? <span className="font-medium text-slate-800">{label}</span> : null}
      <span
        className={[
          'flex h-11 items-center rounded-xl border bg-white px-3 transition-colors focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100',
          error ? 'border-rose-300' : 'border-slate-200',
        ].join(' ')}
      >
        {leftAddon ? <span className="mr-2 text-slate-400">{leftAddon}</span> : null}
        <input
          ref={ref}
          id={id}
          className={[
            'w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {rightAddon ? <span className="ml-2 text-slate-400">{rightAddon}</span> : null}
      </span>
      {message ? <span className={`text-xs ${messageColor}`}>{message}</span> : null}
    </label>
  );
});

export default Input;
