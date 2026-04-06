import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils';

type FlexDirection = 'row' | 'column';
type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type FlexWrap = 'nowrap' | 'wrap';
type FlexGap = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 32;

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  align?: FlexAlign;
  children: ReactNode;
  direction?: FlexDirection;
  gap?: FlexGap;
  justify?: FlexJustify;
  wrap?: FlexWrap;
};

const directionClassName: Record<FlexDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
};

const alignClassName: Record<FlexAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClassName: Record<FlexJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const wrapClassName: Record<FlexWrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
};

const gapClassName: Record<FlexGap, string> = {
  0: 'gap-0',
  4: 'gap-[0.4rem]',
  8: 'gap-[0.8rem]',
  12: 'gap-[1.2rem]',
  16: 'gap-[1.6rem]',
  20: 'gap-[2rem]',
  24: 'gap-[2.4rem]',
  32: 'gap-[3.2rem]',
};

export function Flex({
  align = 'stretch',
  children,
  className,
  direction = 'row',
  gap = 0,
  justify = 'start',
  wrap = 'nowrap',
  ...props
}: FlexProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex',
        directionClassName[direction],
        alignClassName[align],
        justifyClassName[justify],
        wrapClassName[wrap],
        gapClassName[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}
