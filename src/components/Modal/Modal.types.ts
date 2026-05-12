export interface ModalProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  children?: React.ReactNode;
}
