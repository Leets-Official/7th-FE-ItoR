import { FetchBoundary } from '@shared/ui';
import PostList from '@pages/post/post-list/components/post-list/PostList.tsx';

function PostListPage() {
  return (
    <div>
      <FetchBoundary loadingFallback={<div>Loading posts...</div>}>
        <PostList />
      </FetchBoundary>
    </div>
  );
}

export default PostListPage;
