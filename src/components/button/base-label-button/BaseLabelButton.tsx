import type { ReactNode } from 'react'
import type { ButtonCommonProps } from '../Button.types'
import { BASE_LABEL_BUTTON_CLASS } from './BaseLabelButton.style'
import { cn } from '@/utils/cn'

type BaseLabelButtonProps = Omit<ButtonCommonProps, 'aria-label' | 'children'> & {
  ariaLabel?: string
  buttonClassName?: string
  icon?: ReactNode
  label?: string
}

export function BaseLabelButton({
  ariaLabel,
  buttonClassName,
  className,
  icon,
  label = '깃로그 시작하기',
  type,
  ...buttonProps
}: BaseLabelButtonProps) {
  const resolvedAriaLabel = ariaLabel ?? label

  return (
    <button
      type={type ?? 'button'}
      aria-label={resolvedAriaLabel}
      className={cn(BASE_LABEL_BUTTON_CLASS, buttonClassName, className)}
      {...buttonProps}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
