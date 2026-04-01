import { useSuspensePostListQuery } from '@/apis';

export default function PostList() {
  const { data } = useSuspensePostListQuery({ size: 10, page: 1 });
  return (
    <>
      {data.posts.map((post) => (
        <div key={`${post.postId}`}>{post.title}</div>
      ))}
    </>
  );
}
