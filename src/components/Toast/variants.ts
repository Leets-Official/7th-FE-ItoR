import { DoneIcon, ErrorIcon } from '@/assets/icons';

export const toastBaseStyle = {
  root: 'inline-flex h-10 items-center gap-1 rounded-[25px] border bg-white/90 px-3 py-2 shadow-sm',
  icon: 'flex h-6 w-6 shrink-0 items-center justify-center',
  text: 'flex h-[22px] items-center whitespace-nowrap text-sm font-regular leading-none tracking-[-0.07px]',
};

export const toastVariantStyle = {
  error: {
    Icon: ErrorIcon,
    color: 'text-warning border-warning',
    role: 'alert' as const,
  },
  success: {
    Icon: DoneIcon,
    color: 'text-positive border-positive',
    role: 'status' as const,
  },
};
