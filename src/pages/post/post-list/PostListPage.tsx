import { FetchBoundary } from '@shared/ui';
import PostList from '@pages/post/post-list/components/post-list/PostList.tsx';

function PostListPage() {
  return (
    <div>
      <FetchBoundary loadingFallback={<div>게시글 목록 가져오는중</div>}>
        <PostList />
      </FetchBoundary>
    </div>
  );
}

export default PostListPage;
