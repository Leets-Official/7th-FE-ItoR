import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/components/button/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'
import './CompactLabelButton.css'

const COMPACT_LABEL_BUTTON_VARIANTS = {
  plain: '',
  gray90: 'compact-label-button--gray90',
} as const

export type CompactLabelButtonVariant = keyof typeof COMPACT_LABEL_BUTTON_VARIANTS

type CompactLabelButtonProps = ButtonCommonProps & {
  variant?: CompactLabelButtonVariant
}

export function CompactLabelButton({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  onClick,
  variant = 'plain',
}: CompactLabelButtonProps) {
  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      className={cn('compact-label-button', COMPACT_LABEL_BUTTON_VARIANTS[variant], className)}
      onClick={onClick}
      icon={<CreateIcon className="compact-label-button__icon" />}
    />
  )
}
