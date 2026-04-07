import { BaseLabelButton } from '@/components/button/BaseLabelButton'
import { CreateIcon } from '@/assets/icons/CreateIcon'
import type { ButtonCommonProps } from '@/components/button/types'
import { cn } from '@/utils/cn'

const BUTTON_TONE = {
  point: 'text-[var(--color-point)]',
  gray: 'text-[var(--color-gray-56)]',
  inverse: 'text-[var(--color-white)]',
} as const

const BUTTON_SURFACE = {
  white: 'bg-[var(--color-white)]',
  grayFilled: 'bg-[var(--color-gray-90)]',
  active: 'bg-[var(--color-gray-7)]',
} as const

const BUTTON_LAYOUT = {
  default:
    'h-10 rounded-[25px] border px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px]',
  plain:
    'h-auto items-start rounded-[25px] border border-transparent px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px]',
} as const

const BUTTON_BORDER = {
  point: 'border-[var(--color-point)]',
  gray: 'border-[var(--color-gray-56)]',
  none: 'border-transparent',
} as const

const BUTTON_VARIANTS = {
  point: { tone: 'point', surface: 'white', layout: 'default', border: 'point' },
  grayOutline: { tone: 'gray', surface: 'white', layout: 'default', border: 'gray' },
  grayPlain: { tone: 'gray', surface: 'white', layout: 'plain', border: 'none' },
  active: { tone: 'inverse', surface: 'active', layout: 'default', border: 'none' },
  grayFilledOutline: { tone: 'gray', surface: 'grayFilled', layout: 'default', border: 'gray' },
  grayFilled: { tone: 'gray', surface: 'grayFilled', layout: 'plain', border: 'none' },
} as const

export type ButtonVariant = keyof typeof BUTTON_VARIANTS

type ButtonProps = ButtonCommonProps & {
  variant?: ButtonVariant
}

export function Button({
  ariaLabel,
  className,
  label = '깃로그 시작하기',
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
        <span className="flex size-6 items-center justify-center" aria-hidden="true">
          <CreateIcon className="block size-6" />
        </span>
      }
      {...buttonProps}
    />
  )
}
