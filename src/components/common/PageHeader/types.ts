export type PageHeaderType = 'main' | 'detail' | 'write' | 'empty';

export interface PageHeaderActionProps {
  onCommentClick?: () => void;
  onWriteClick?: () => void;
  onCancelClick?: () => void;
  onSubmitPost?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  isSubmitDisabled?: boolean;
  authStateOverride?: 'guest' | 'member';
  canManagePost?: boolean;
  isPostMenuOpen?: boolean;
  onTogglePostMenu?: () => void;
  onEditPost?: () => void;
  onDeletePost?: () => void;
}
