export type PageHeaderType = 'main' | 'detail' | 'write';

export interface PageHeaderActionProps {
  onCommentClick?: () => void;
  onWriteClick?: () => void;
  onSubmitPost?: () => void;
  canManagePost?: boolean;
  isPostMenuOpen?: boolean;
  onTogglePostMenu?: () => void;
  onEditPost?: () => void;
  onDeletePost?: () => void;
}
