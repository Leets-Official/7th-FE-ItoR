import type { ReactNode } from 'react'

type BaseLabelButtonProps = {
  ariaLabel?: string
  className?: string
  icon?: ReactNode
  label?: string
  onClick?: () => void
}

export function BaseLabelButton({
  ariaLabel,
  className,
  icon,
  label = '깃로그 시작하기',
  onClick,
}: BaseLabelButtonProps) {
  const resolvedAriaLabel = ariaLabel ?? label

  return (
    <button type="button" aria-label={resolvedAriaLabel} className={className} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  )
}
