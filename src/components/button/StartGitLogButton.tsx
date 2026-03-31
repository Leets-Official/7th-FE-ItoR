import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/components/button/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'
import './StartGitLogButton.css'

const BUTTON_VARIANTS = {
  point: 'start-git-log-button--point',
  grayOutline: 'start-git-log-button--gray-outline',
  grayPlain: 'start-git-log-button--gray-plain',
  active: 'start-git-log-button--active',
  grayFilledOutline: 'start-git-log-button--gray-filled-outline',
  grayFilled: 'start-git-log-button--gray-filled',
} as const

export type StartGitLogButtonVariant = keyof typeof BUTTON_VARIANTS

type StartGitLogButtonProps = ButtonCommonProps & {
  variant?: StartGitLogButtonVariant
}

export function StartGitLogButton({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  onClick,
  variant = 'point',
}: StartGitLogButtonProps) {
  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      className={cn('start-git-log-button', BUTTON_VARIANTS[variant], className)}
      onClick={onClick}
      icon={
        <span className="start-git-log-button__icon-wrapper" aria-hidden="true">
          <CreateIcon className="start-git-log-button__icon" />
        </span>
      }
    />
  )
}
