import { CreateIcon } from '@/assets/icons/CreateIcon'
import type { ButtonCommonProps } from '../Button.types'
import { BaseLabelButton } from '../base-label-button'
import { MINI_BUTTON_BASE_CLASS, MINI_BUTTON_VARIANTS } from './MiniButton.style'
import { cn } from '@/utils/cn'

export type MiniButtonVariant = keyof typeof MINI_BUTTON_VARIANTS

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
  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      buttonClassName={cn(MINI_BUTTON_BASE_CLASS, MINI_BUTTON_VARIANTS[variant])}
      className={className}
      icon={<CreateIcon className="size-3.5 shrink-0" />}
      {...buttonProps}
    />
  )
}
