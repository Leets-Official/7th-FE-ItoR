import { renderDetailType, renderMainType, renderWriteType } from './PageHeaderRenderers';
<<<<<<< HEAD
import type { PageHeaderActionProps, PageHeaderType } from './types';

interface PageHeaderRightProps extends PageHeaderActionProps {
  type: PageHeaderType;
}

function PageHeaderRight({
  type,
  onCommentClick,
  onWriteClick,
  onSubmitPost,
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
      return renderWriteType({ onDeletePost, onSubmitPost });
=======
import type { PageHeaderType } from './types';

interface PageHeaderRightProps {
  type: PageHeaderType;
}

function PageHeaderRight({ type }: PageHeaderRightProps) {
  switch (type) {
    case 'main':
      return renderMainType();
    case 'detail':
      return renderDetailType();
    case 'write':
      return renderWriteType();
>>>>>>> upstream/최예빈/main
    default:
      return null;
  }
}

export default PageHeaderRight;
