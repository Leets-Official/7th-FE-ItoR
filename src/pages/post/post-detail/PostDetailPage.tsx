import { FetchBoundary } from '@shared/ui';
import PostDetail from '@pages/post/post-detail/components/post-detail/PostDetail.tsx';

function PostDetailPage() {
  return (
    <div>
      <FetchBoundary loadingFallback={<div>Loading post...</div>}>
        <PostDetail />
      </FetchBoundary>
    </div>
  );
}

export default PostDetailPage;
