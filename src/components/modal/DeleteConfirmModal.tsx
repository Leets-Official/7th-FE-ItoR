import { useId } from 'react'
import { Button } from '@/components/button/StartGitLogButton'
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
        'flex w-[326px] flex-col items-start gap-6 rounded-[4px] bg-[var(--color-white)] px-4 pb-4 pt-6 shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]',
        className,
      )}
    >
      <div className="flex w-full self-stretch flex-col items-start gap-2 rounded-xl px-1">
        <p
          id={titleId}
          className="m-0 whitespace-pre-line text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[var(--color-black)]"
        >
          {title}
        </p>
        {showDescription ? (
          <p
            id={descriptionId}
            className="m-0 whitespace-pre-line text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[var(--color-gray-56)]"
          >
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex w-full gap-2">
        <Button
          className="flex-1 rounded-[2px] border-[var(--color-gray-96)] text-[var(--color-black)]"
          label={cancelText}
          onClick={onCancel}
          showIcon={false}
          variant="grayOutline"
        />
        <Button
          className="flex-1 rounded-[2px]"
          label={deleteText}
          onClick={onDelete}
          showIcon={false}
          variant="negative"
        />
      </div>
    </section>
  )
}
