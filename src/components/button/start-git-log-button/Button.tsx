import { CreateIcon } from '@/assets/icons/CreateIcon'
import type { ButtonCommonProps } from '../Button.types'
import { BaseLabelButton } from '../base-label-button'
import {
  BUTTON_BORDER,
  BUTTON_LAYOUT,
  BUTTON_SURFACE,
  BUTTON_TONE,
  BUTTON_VARIANTS,
} from './Button.style'
import { cn } from '@/utils/cn'

export type ButtonVariant = keyof typeof BUTTON_VARIANTS

type ButtonProps = ButtonCommonProps & {
  showIcon?: boolean
  variant?: ButtonVariant
}

export function Button({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  showIcon = true,
  variant = 'point',
  ...buttonProps
}: ButtonProps) {
  const variantRecipe = BUTTON_VARIANTS[variant]

  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      buttonClassName={cn(
        BUTTON_LAYOUT[variantRecipe.layout],
        BUTTON_SURFACE[variantRecipe.surface],
        BUTTON_TONE[variantRecipe.tone],
        BUTTON_BORDER[variantRecipe.border],
      )}
      className={className}
      icon={
        showIcon ? (
          <span className="flex size-6 items-center justify-center" aria-hidden="true">
            <CreateIcon className="block size-6" />
          </span>
        ) : undefined
      }
      {...buttonProps}
    />
  )
}
