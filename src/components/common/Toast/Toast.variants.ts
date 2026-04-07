import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    root:
      'inline-flex h-10 w-fit self-start items-center gap-1 rounded-[25px] border bg-white px-3',
    icon: 'flex h-6 w-6 shrink-0 items-center justify-center',
    text: 'block h-[22px] whitespace-nowrap text-sm font-regular leading-[22px] tracking-[-0.07px]',
  },
  variants: {
    tone: {
      error: {
        root: 'border-warning text-warning',
      },
      success: {
        root: 'border-positive text-positive',
      },
    },
  },
  defaultVariants: {
    tone: 'error',
  },
});
