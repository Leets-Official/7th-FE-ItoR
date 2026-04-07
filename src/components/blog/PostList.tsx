import { Pagination } from '../common/Pagination';
import type { PostCardProps } from './PostCard';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: PostCardProps[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PostList({ currentPage, onPageChange, posts, totalPages }: PostListProps) {
  return (
    <section className="rounded-none bg-transparent">
      <div>
        {posts.map((post) => (
          <PostCard key={`${post.title}-${post.date}`} {...post} />
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </section>
  );
}

export default PostList;
