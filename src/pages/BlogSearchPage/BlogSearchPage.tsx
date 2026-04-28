import { Divider } from '@/components/common/Divider';
import { PageHeader } from '@/components/common/PageHeader';
import { PostListItem } from '@/components/common/PostListItem';

const POSTS = [
  {
    id: 1,
    title: '16 Title one line',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a...",
    nickname: '닉네임',
    date: 'Fed 17. 2025.',
    commentCount: 0,
    descriptionLines: 2 as const,
  },
  {
    id: 2,
    title: '16 Title one line',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    nickname: '닉네임',
    date: 'Fed 17. 2025.',
    commentCount: 0,
    descriptionLines: 1 as const,
  },
  {
    id: 3,
    title: '16 Title one line',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type an...",
    nickname: '닉네임',
    date: 'Fed 17. 2025.',
    commentCount: 0,
    descriptionLines: 2 as const,
    showThumbnail: false,
  },
  {
    id: 4,
    title: '16 Title one line',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    nickname: '닉네임',
    date: 'Fed 17. 2025.',
    commentCount: 0,
    descriptionLines: 1 as const,
    showThumbnail: false,
  },
];

export function BlogSearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader type="main" className="h-[72px] px-4 py-4" />

      <main className="mx-auto flex w-full max-w-[688px] flex-col">
        <div className="h-8" aria-hidden="true" />

        {POSTS.map((post) => (
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
