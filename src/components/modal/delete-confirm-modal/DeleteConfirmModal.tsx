import { useId, type ComponentPropsWithoutRef } from 'react'
import { Button } from '@/components/button'
import {
  DELETE_CONFIRM_CANCEL_BUTTON_CLASS,
  DELETE_CONFIRM_DELETE_BUTTON_CLASS,
  MODAL_CONTENT_CLASS,
  MODAL_DESCRIPTION_CLASS,
  MODAL_FOOTER_CLASS,
  MODAL_ROOT_CLASS,
  MODAL_TITLE_CLASS,
} from './DeleteConfirmModal.style'
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
      className={cn(MODAL_ROOT_CLASS, className)}
      {...props}
    >
      {children}
    </section>
  )
}

type ModalSlotProps = ComponentPropsWithoutRef<'div'>

function ModalContent({ className, ...props }: ModalSlotProps) {
  return <div className={cn(MODAL_CONTENT_CLASS, className)} {...props} />
}

function ModalFooter({ className, ...props }: ModalSlotProps) {
  return <div className={cn(MODAL_FOOTER_CLASS, className)} {...props} />
}

type ModalTextProps = ComponentPropsWithoutRef<'p'>

function ModalTitle({ className, ...props }: ModalTextProps) {
  return <p className={cn(MODAL_TITLE_CLASS, className)} {...props} />
}

function ModalDescription({ className, ...props }: ModalTextProps) {
  return <p className={cn(MODAL_DESCRIPTION_CLASS, className)} {...props} />
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
          className={DELETE_CONFIRM_CANCEL_BUTTON_CLASS}
          label={cancelText}
          onClick={onCancel}
          showIcon={false}
          variant="grayOutline"
        />
        <Button
          className={DELETE_CONFIRM_DELETE_BUTTON_CLASS}
          label={deleteText}
          onClick={onDelete}
          showIcon={false}
          variant="negative"
        />
      </Modal.Footer>
    </Modal>
  )
}
