import { renderDetailType, renderMainType, renderWriteType } from './PageHeaderRenderers';
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
    default:
      return null;
  }
}

export default PageHeaderRight;
