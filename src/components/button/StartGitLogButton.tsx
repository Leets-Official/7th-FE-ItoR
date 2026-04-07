import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/assets/icons/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'

const BUTTON_VARIANTS = {
  point: 'border-[var(--color-point)] text-[var(--color-point)]',
  grayOutline: 'border-[var(--color-gray-56)] bg-[var(--color-white)] text-[var(--color-gray-56)]',
  grayPlain: 'h-auto items-start border-transparent bg-[var(--color-white)] text-[var(--color-gray-56)]',
  active: 'border-transparent bg-[var(--color-gray-7)] text-[var(--color-white)]',
  grayFilledOutline: 'border-[var(--color-gray-56)] bg-[var(--color-gray-90)] text-[var(--color-gray-56)]',
  grayFilled: 'h-auto items-start border-transparent bg-[var(--color-gray-90)] text-[var(--color-gray-56)]',
} as const

export type ButtonVariant = keyof typeof BUTTON_VARIANTS

type ButtonProps = ButtonCommonProps & {
  variant?: ButtonVariant
}

export function Button({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  variant = 'point',
  ...buttonProps
}: ButtonProps) {
  const baseClassName =
    'inline-flex h-10 cursor-pointer items-center justify-center gap-1 rounded-[25px] border border-transparent bg-[var(--color-white)] px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[var(--color-gray-7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'

  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      className={cn(baseClassName, BUTTON_VARIANTS[variant], className)}
      icon={
        <span className="flex size-6 items-center justify-center" aria-hidden="true">
          <CreateIcon className="block size-6" />
        </span>
      }
      {...buttonProps}
    />
  )
}
