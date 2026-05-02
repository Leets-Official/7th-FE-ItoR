import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-1 border font-regular transition-colors',
  {
    variants: {
      size: {
        regular: 'h-10 rounded-[25px] px-3 py-2',
        text: 'h-[25px] rounded-[2px] px-2 py-[2px]',
      },
      intent: {
        primary: '',
        gray: '',
        dark: '',
      },
      state: {
        default: '',
        pressed: '',
        disabled: 'cursor-not-allowed',
        disabledFilled: 'cursor-not-allowed',
      },
    },
    compoundVariants: [
      { size: 'regular', intent: 'primary', state: 'default', className: 'border-primary bg-white text-primary' },

      { size: 'regular', intent: 'gray', state: 'default', className: 'border-gray-56 bg-white text-gray-56' },
      { size: 'regular', intent: 'gray', state: 'pressed', className: 'border-gray-90 bg-gray-90 text-gray-56' },
      { size: 'regular', intent: 'gray', state: 'disabled', className: 'border-transparent bg-white text-gray-56' },
      { size: 'regular', intent: 'gray', state: 'disabledFilled', className: 'border-transparent bg-gray-90 text-gray-56' },

      { size: 'regular', intent: 'dark', state: 'default', className: 'border-black bg-black text-white' },
      { size: 'regular', intent: 'dark', state: 'pressed', className: 'border-dark bg-dark text-gray-56' },

      { size: 'text', intent: 'gray', state: 'default', className: 'border-transparent bg-transparent text-gray-56' },
      { size: 'text', intent: 'gray', state: 'disabledFilled', className: 'border-transparent bg-gray-90 text-gray-56' },
    ],
    defaultVariants: {
      size: 'regular',
      intent: 'primary',
      state: 'default',
    },
  },
);

export const buttonTextVariants = cva('', {
  variants: {
    size: {
      regular: 'whitespace-nowrap text-sm leading-[160%] tracking-[-0.07px]',
      text: 'whitespace-nowrap text-xs leading-[160%] tracking-[0]',
    },
  },
  defaultVariants: {
    size: 'regular',
  },
});

export const buttonIconVariants = cva(
  'flex shrink-0 items-center justify-center text-current [&_*]:fill-current [&_*]:stroke-current',
  {
    variants: {
      size: {
        regular: 'h-6 w-6 [&>svg]:h-[18px] [&>svg]:w-[18px]',
        text: 'h-[14px] w-[14px] [&>svg]:h-[10.5px] [&>svg]:w-[10.5px]',
      },
    },
    defaultVariants: {
      size: 'regular',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
