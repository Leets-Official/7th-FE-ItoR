import { renderDetailType, renderMainType, renderWriteType } from './PageHeaderRenderers';
import type { PageHeaderActionProps, PageHeaderType } from './types';

interface PageHeaderRightProps extends PageHeaderActionProps {
  type: PageHeaderType;
}

function PageHeaderRight({
  type,
  onCommentClick,
  onWriteClick,
  onCancelClick,
  onSubmitPost,
  cancelLabel,
  submitLabel,
  isSubmitDisabled,
  canManagePost,
  isPostMenuOpen,
  onTogglePostMenu,
  onEditPost,
  onDeletePost,
}: PageHeaderRightProps) {
  switch (type) {
    case 'main':
      return renderMainType({ onWriteClick });
    case 'detail':
      return renderDetailType({
        onCommentClick,
        canManagePost,
        isPostMenuOpen,
        onTogglePostMenu,
        onEditPost,
        onDeletePost,
      });
    case 'write':
      return renderWriteType({ onDeletePost, onCancelClick, onSubmitPost, cancelLabel, submitLabel, isSubmitDisabled });
    default:
      return null;
  }
}

export default PageHeaderRight;
