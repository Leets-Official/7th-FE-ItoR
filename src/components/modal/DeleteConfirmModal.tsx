import { useId } from 'react'
import { cn } from '@/utils/cn'

type ModalVariant = 'withDescription' | 'titleOnly'

type ModalProps = {
  cancelText?: string
  className?: string
  deleteText?: string
  description?: string
  onCancel?: () => void
  onDelete?: () => void
  title?: string
  variant?: ModalVariant
}

export function Modal({
  cancelText = '취소',
  className,
  deleteText = '삭제하기',
  description = 'description line one\ndescription line two',
  onCancel,
  onDelete,
  title = 'Title line one\nTitle line two',
  variant = 'withDescription',
}: ModalProps) {
  const dialogId = useId()
  const descriptionId = `${dialogId}-description`
  const titleId = `${dialogId}-title`
  const showDescription = variant === 'withDescription'

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={showDescription ? descriptionId : undefined}
      className={cn(
        'flex w-[326px] flex-col items-start gap-6 rounded-[4px] bg-white px-4 pb-4 pt-6 shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]',
        className,
      )}
    >
      <div className="flex w-full self-stretch flex-col items-start gap-2 rounded-xl px-1">
        <p
          id={titleId}
          className="m-0 whitespace-pre-line text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-black [font-family:'Noto_Sans_KR',sans-serif]"
        >
          {title}
        </p>
        {showDescription ? (
          <p
            id={descriptionId}
            className="m-0 whitespace-pre-line text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[#909090] [font-family:'Noto_Sans_KR',sans-serif]"
          >
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex w-full gap-2">
        <button
          type="button"
          className="flex flex-[1_0_0] cursor-pointer items-center justify-center gap-2 rounded-[2px] border border-[#F5F5F5] bg-white px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-black [font-family:'Noto_Sans_KR',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className="flex flex-[1_0_0] cursor-pointer items-center justify-center gap-2 rounded-[2px] border-0 bg-[#FF3F3F] px-3 py-2 text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-white [font-family:'Noto_Sans_KR',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          onClick={onDelete}
        >
          {deleteText}
        </button>
      </div>
    </section>
  )
}
