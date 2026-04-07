import type { ReactNode } from 'react'
import type { ButtonCommonProps } from '@/components/button/types'

type BaseLabelButtonProps = Omit<ButtonCommonProps, 'aria-label' | 'children'> & {
  ariaLabel?: string
  icon?: ReactNode
  label?: string
}

export function BaseLabelButton({
  ariaLabel,
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
      className={className}
      {...buttonProps}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
