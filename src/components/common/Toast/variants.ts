import { DoneIcon, ErrorOutlineIcon } from '@/assets/icons';

export const toastBaseStyle = {
  root: 'inline-flex h-10 w-fit self-start items-center gap-1 rounded-[25px] border bg-white px-3',
  icon: 'flex h-6 w-6 shrink-0 items-center justify-center',
  text: 'block h-[22px] whitespace-nowrap text-sm font-regular leading-[22px] tracking-[-0.07px]',
};

export const toastVariantStyle = {
  error: {
    Icon: ErrorOutlineIcon,
    color: 'text-warning border-warning',
    role: 'alert' as const,
  },
  success: {
    Icon: DoneIcon,
    color: 'text-positive border-positive',
    role: 'status' as const,
  },
};
