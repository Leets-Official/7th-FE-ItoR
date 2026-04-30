import { Divider } from '@/components/common/Divider';
import { PageHeader } from '@/components/common/PageHeader';
import { PostListItem } from '@/components/common/PostListItem';
import { BLOG_POSTS_MOCK_RESPONSE, mapBlogPostsToListItems } from './BlogSearchPage.mapper';

export function BlogSearchPage() {
  const postListItems = mapBlogPostsToListItems(BLOG_POSTS_MOCK_RESPONSE);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader type="main" className="h-[72px] px-4 py-4" />

      <main className="mx-auto flex w-full max-w-[688px] flex-col">
        <div className="h-8" aria-hidden="true" />

        {postListItems.map((post) => (
          <div key={post.id} className="flex flex-col">
            <PostListItem
              title={post.title}
              description={post.description}
              nickname={post.nickname}
              date={post.date}
              commentCount={post.commentCount}
              descriptionLines={post.descriptionLines}
              showThumbnail={post.showThumbnail}
            />
            <Divider color="gray96" />
          </div>
        ))}
      </main>
    </div>
  );
}
