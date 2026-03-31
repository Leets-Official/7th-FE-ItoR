import { useId } from 'react'
import { cn } from '@/utils/cn'
import './DeleteConfirmModal.css'

type DeleteModalVariant = 'withDescription' | 'titleOnly'

type DeleteModalProps = {
  cancelText?: string
  className?: string
  deleteText?: string
  description?: string
  onCancel?: () => void
  onDelete?: () => void
  title?: string
  variant?: DeleteModalVariant
}

export function DeleteModal({
  cancelText = '취소',
  className,
  deleteText = '삭제하기',
  description = 'description line one\ndescription line two',
  onCancel,
  onDelete,
  title = 'Title line one\nTitle line two',
  variant = 'withDescription',
}: DeleteModalProps) {
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
      className={cn('delete-confirm-modal', className)}
    >
      <div className="delete-confirm-modal__content">
        <p id={titleId} className="delete-confirm-modal__title">
          {title}
        </p>
        {showDescription ? (
          <p id={descriptionId} className="delete-confirm-modal__description">
            {description}
          </p>
        ) : null}
      </div>
      <div className="delete-confirm-modal__actions">
        <button
          type="button"
          className="delete-confirm-modal__button delete-confirm-modal__button--cancel"
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className="delete-confirm-modal__button delete-confirm-modal__button--delete"
          onClick={onDelete}
        >
          {deleteText}
        </button>
      </div>
    </section>
  )
}
