import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils';

type TopRootProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function TopRoot({ children, className, ...props }: TopRootProps) {
  return (
    <div {...props} className={cn('flex items-start justify-between gap-[1.6rem]', className)}>
      {children}
    </div>
  );
}

type TopTextProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function TopText({ children, className, ...props }: TopTextProps) {
  return (
    <div {...props} className={cn('flex min-w-0 flex-1 flex-col gap-[0.6rem]', className)}>
      {children}
    </div>
  );
}

type TopTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export function TopTitle({ children, className, ...props }: TopTitleProps) {
  return (
    <h2
      {...props}
      className={cn(
        'text-[2rem] leading-[1.4] font-semibold tracking-[-0.03em] text-[#111111]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

type TopDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function TopDescription({ children, className, ...props }: TopDescriptionProps) {
  return (
    <p
      {...props}
      className={cn('text-[1.4rem] leading-[1.5] font-normal text-[#8f8f8f]', className)}
    >
      {children}
    </p>
  );
}

type TopRightProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function TopRight({ children, className, ...props }: TopRightProps) {
  return (
    <div {...props} className={cn('flex shrink-0 items-center gap-[0.8rem]', className)}>
      {children}
    </div>
  );
}
