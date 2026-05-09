import { cva, type VariantProps } from 'class-variance-authority';

export type TextFieldSize = 14 | 32;
export type TextFieldState = 'default' | 'input' | 'click' | 'disabled';

export const textFieldVariants = cva('w-[656px] rounded-md border px-4 py-3 outline-none', {
  variants: {
    size: {
      32: 'h-[62px] text-2xl font-medium leading-[160%] tracking-[0]',
      14: 'h-[46px] text-sm font-light leading-[160%] tracking-[-0.07px]',
    },
    state: {
      default: 'border-gray-90 bg-transparent text-gray-56 placeholder:text-gray-56',
      input: 'border-gray-90 bg-transparent text-black placeholder:text-gray-78',
      click: 'border-black bg-transparent text-black placeholder:text-gray-78',
      disabled: 'cursor-not-allowed border-gray-90 bg-gray-90 text-gray-56 placeholder:text-gray-56',
    },
  },
  defaultVariants: {
    size: 32,
    state: 'default',
  },
});

export type TextFieldVariantProps = VariantProps<typeof textFieldVariants>;
