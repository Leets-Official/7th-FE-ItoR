import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/assets/icons/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'

const COMPACT_LABEL_BUTTON_VARIANTS = {
  plain: '',
  gray90: 'bg-[var(--color-gray-90)]',
} as const

export type MiniButtonVariant = keyof typeof COMPACT_LABEL_BUTTON_VARIANTS

type MiniButtonProps = ButtonCommonProps & {
  variant?: MiniButtonVariant
}

export function MiniButton({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  variant = 'plain',
  ...buttonProps
}: MiniButtonProps) {
  const baseClassName =
    'inline-flex cursor-pointer items-center justify-center gap-1 border-0 bg-transparent px-2 pb-1 pt-0.5 text-xs font-normal leading-[160%] text-[var(--color-gray-56)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'

  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      className={cn(baseClassName, COMPACT_LABEL_BUTTON_VARIANTS[variant], className)}
      icon={<CreateIcon className="size-3.5 shrink-0" />}
      {...buttonProps}
    />
  )
}
