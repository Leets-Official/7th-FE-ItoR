import { cn } from '@/utils/cn'
import './CompactLabelButton.css'

const COMPACT_LABEL_BUTTON_VARIANTS = {
  plain: '',
  gray90: 'compact-label-button--gray90',
} as const

type CompactLabelButtonVariant = keyof typeof COMPACT_LABEL_BUTTON_VARIANTS

type CompactLabelButtonProps = {
  ariaLabel?: string
  className?: string
  label?: string
  onClick?: () => void
  variant?: CompactLabelButtonVariant
}

export function CompactLabelButton({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  onClick,
  variant = 'plain',
}: CompactLabelButtonProps) {
  const resolvedAriaLabel = ariaLabel ?? label

  return (
    <button
      type="button"
      aria-label={resolvedAriaLabel}
      className={cn('compact-label-button', COMPACT_LABEL_BUTTON_VARIANTS[variant], className)}
      onClick={onClick}
    >
      <svg
        className="compact-label-button__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
      >
        <path
          d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
          fill="currentColor"
        />
      </svg>
      <span>{label}</span>
    </button>
  )
}
