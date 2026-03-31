import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/components/button/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'

const BUTTON_VARIANTS = {
  point: 'border-[#00A1FF] text-[#00A1FF]',
  grayOutline: 'border-[#909090] bg-white text-[#909090]',
  grayPlain: 'h-auto items-start border-transparent bg-white text-[#909090]',
  active: 'border-transparent bg-[#111112] text-white',
  grayFilledOutline: 'border-[#909090] bg-[#E6E6E6] text-[#909090]',
  grayFilled: 'h-auto items-start border-transparent bg-[#E6E6E6] text-[#909090]',
} as const

export type ButtonVariant = keyof typeof BUTTON_VARIANTS

type ButtonProps = ButtonCommonProps & {
  variant?: ButtonVariant
}

export function Button({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
  onClick,
  variant = 'point',
}: ButtonProps) {
  const baseClassName =
    "inline-flex h-10 cursor-pointer items-center justify-center gap-1 rounded-[25px] border border-transparent bg-white px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[#111112] [font-family:'Noto_Sans_KR',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"

  return (
    <BaseLabelButton
      ariaLabel={ariaLabel}
      label={label}
      className={cn(baseClassName, BUTTON_VARIANTS[variant], className)}
      onClick={onClick}
      icon={
        <span className="flex size-6 items-center justify-center" aria-hidden="true">
          <CreateIcon className="block size-6" />
        </span>
      }
    />
  )
}
