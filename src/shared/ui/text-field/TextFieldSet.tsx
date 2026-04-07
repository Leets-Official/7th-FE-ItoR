import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@shared/utils';

export type TextFieldSetProps = HTMLAttributes<HTMLDivElement> & {
  description?: ReactNode;
  title?: ReactNode;
};

export function TextFieldSet({
  children,
  className,
  description,
  title,
  ...props
}: TextFieldSetProps) {
  return (
    <section
      {...props}
      className={cn(
        'flex w-full flex-col gap-[1.6rem] rounded-[0.2rem] border border-[#ececec] bg-white p-[1.6rem]',
        className,
      )}
    >
      {title ? (
        <div className='flex flex-col gap-[0.4rem]'>
          <h3 className='text-[1.4rem] leading-[1.4] font-semibold text-[#111111]'>{title}</h3>
          {description ? (
            <p className='text-[1.2rem] leading-[1.4] text-[#8f8f8f]'>{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className='flex flex-col gap-[1.2rem]'>{children}</div>
    </section>
  );
}
