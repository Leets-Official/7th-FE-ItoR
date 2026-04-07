import type { ReactNode } from 'react'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'

const BASE_LABEL_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-50'

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
