import type { ReactNode } from 'react';
import { Button } from '@shared/ui/button';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalRoot,
  ModalTitle,
} from '../Modal';

export type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  cancelText?: ReactNode;
  confirmText?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  overlayClassName?: string;
};

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  cancelText = '취소',
  confirmText = '삭제하기',
  onCancel,
  onConfirm,
  overlayClassName,
}: ConfirmModalProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalPortal>
        <ModalOverlay className={overlayClassName} />
        <ModalContent className='mx-auto max-w-[42rem] rounded-[0.6rem] px-[2.8rem] py-[3.2rem] shadow-[0_0.6rem_1.8rem_rgba(106,90,205,0.18)]'>
          <ModalHeader className='block'>
            <ModalTitle className='text-[2rem] leading-[1.45] font-normal text-[#111111]'>
              {title}
            </ModalTitle>
          </ModalHeader>
          {description ? (
            <ModalBody className='mt-[2rem] text-[1.7rem] leading-[1.45] text-[#9b9b9b]'>
              {description}
            </ModalBody>
          ) : null}
          <ModalFooter className='mt-[3.6rem] gap-[1.6rem]'>
            <Button className='flex-1' onClick={handleCancel} variant='outline'>
              {cancelText}
            </Button>
            <Button className='flex-1' onClick={handleConfirm} variant='danger'>
              {confirmText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalPortal>
    </ModalRoot>
  );
}
