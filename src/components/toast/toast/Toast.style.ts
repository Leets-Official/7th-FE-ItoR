export const TOAST_BASE_CLASS =
  'inline-flex h-10 items-center justify-center gap-1 rounded-[25px] border bg-white/90 px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px] backdrop-blur-[2px]'

export const TOAST_VARIANT_CLASS = {
  error: 'border-[var(--color-negative)] text-[var(--color-negative)]',
  success: 'border-[var(--color-positive)] text-[var(--color-positive)]',
} as const
