export const BUTTON_TONE = {
  point: 'text-[var(--color-point)]',
  gray: 'text-[var(--color-gray-56)]',
  inverse: 'text-[var(--color-white)]',
} as const

export const BUTTON_SURFACE = {
  white: 'bg-[var(--color-white)]',
  grayFilled: 'bg-[var(--color-gray-90)]',
  active: 'bg-[var(--color-gray-7)]',
  negative: 'bg-[var(--color-negative)]',
} as const

export const BUTTON_LAYOUT = {
  default:
    'h-10 rounded-[25px] border px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px]',
  plain:
    'h-auto items-start rounded-[25px] border border-transparent px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px]',
} as const

export const BUTTON_BORDER = {
  point: 'border-[var(--color-point)]',
  gray: 'border-[var(--color-gray-56)]',
  none: 'border-transparent',
} as const

export const BUTTON_VARIANTS = {
  point: { tone: 'point', surface: 'white', layout: 'default', border: 'point' },
  grayOutline: { tone: 'gray', surface: 'white', layout: 'default', border: 'gray' },
  grayPlain: { tone: 'gray', surface: 'white', layout: 'plain', border: 'none' },
  active: { tone: 'inverse', surface: 'active', layout: 'default', border: 'none' },
  negative: { tone: 'inverse', surface: 'negative', layout: 'default', border: 'none' },
  grayFilledOutline: { tone: 'gray', surface: 'grayFilled', layout: 'default', border: 'gray' },
  grayFilled: { tone: 'gray', surface: 'grayFilled', layout: 'plain', border: 'none' },
} as const
