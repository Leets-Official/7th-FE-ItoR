import { useId, type ComponentPropsWithoutRef } from 'react'
import { Button } from '@/components/button/StartGitLogButton'
import { cn } from '@/utils/cn'

type ModalRootProps = ComponentPropsWithoutRef<'section'> & {
  describedBy?: string
  labelledBy?: string
}

function ModalRoot({ className, children, describedBy, labelledBy, ...props }: ModalRootProps) {
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cn(
        'flex w-[326px] flex-col items-start gap-6 rounded-[4px] bg-[var(--color-white)] px-4 pb-4 pt-6 shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

type ModalSlotProps = ComponentPropsWithoutRef<'div'>

function ModalContent({ className, ...props }: ModalSlotProps) {
  return (
    <div
      className={cn('flex w-full self-stretch flex-col items-start gap-2 rounded-xl px-1', className)}
      {...props}
    />
  )
}

function ModalFooter({ className, ...props }: ModalSlotProps) {
  return <div className={cn('flex w-full gap-2', className)} {...props} />
}

type ModalTextProps = ComponentPropsWithoutRef<'p'>

function ModalTitle({ className, ...props }: ModalTextProps) {
  return (
    <p
      className={cn(
        'm-0 whitespace-pre-line text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[var(--color-black)]',
        className,
      )}
      {...props}
    />
  )
}

function ModalDescription({ className, ...props }: ModalTextProps) {
  return (
    <p
      className={cn(
        'm-0 whitespace-pre-line text-[14px] font-normal leading-[160%] tracking-[-0.07px] text-[var(--color-gray-56)]',
        className,
      )}
      {...props}
    />
  )
}

export const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Description: ModalDescription,
  Footer: ModalFooter,
  Title: ModalTitle,
})

type DeleteConfirmModalVariant = 'withDescription' | 'titleOnly'

type DeleteConfirmModalProps = {
  cancelText?: string
  className?: string
  deleteText?: string
  description?: string
  onCancel?: () => void
  onDelete?: () => void
  title?: string
  variant?: DeleteConfirmModalVariant
}

export function DeleteConfirmModal({
  cancelText = '취소',
  className,
  deleteText = '삭제하기',
  description = 'description line one\ndescription line two',
  onCancel,
  onDelete,
  title = 'Title line one\nTitle line two',
  variant = 'withDescription',
}: DeleteConfirmModalProps) {
  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const descriptionId = `${dialogId}-description`
  const showDescription = variant === 'withDescription'

  return (
    <Modal
      className={className}
      labelledBy={titleId}
      describedBy={showDescription ? descriptionId : undefined}
    >
      <Modal.Content>
        <Modal.Title id={titleId}>{title}</Modal.Title>
        {showDescription ? (
          <Modal.Description id={descriptionId}>{description}</Modal.Description>
        ) : null}
      </Modal.Content>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  )
}
