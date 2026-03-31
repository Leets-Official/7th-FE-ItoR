import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/components/button/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'

const COMPACT_LABEL_BUTTON_VARIANTS = {
  plain: '',
  gray90: 'bg-[#E6E6E6]',
} as const

export type MiniButtonVariant = keyof typeof COMPACT_LABEL_BUTTON_VARIANTS

type MiniButtonProps = ButtonCommonProps & {
  variant?: MiniButtonVariant
}

export function MiniButton({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  onClick,
  variant = 'plain',
}: MiniButtonProps) {
  const baseClassName =
    "inline-flex cursor-pointer items-center justify-center gap-1 border-0 bg-transparent px-2 pb-1 pt-0.5 text-xs font-normal leading-[160%] text-[#909090] [font-family:'Noto_Sans_KR',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"

  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      className={cn(baseClassName, COMPACT_LABEL_BUTTON_VARIANTS[variant], className)}
      onClick={onClick}
      icon={<CreateIcon className="size-3.5 shrink-0" />}
    />
  )
}
