import { startTransition, useState } from 'react';
import { useSuspensePostListQuery, type PostContent, type PostSummary } from '@/apis';
import { Header, Pagination } from '@shared/ui';

function MenuIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M5 7h14M5 12h14M5 17h14'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.8'
      />
    </svg>
  );
}

function WriteIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M4 17.25V20h2.75L17.8 8.94l-2.75-2.75L4 17.25Zm15.71-9.04a1 1 0 0 0 0-1.42l-2.5-2.5a1 1 0 0 0-1.42 0l-.98.98 3.92 3.92.98-.98Z'
        fill='currentColor'
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <circle cx='11' cy='11' r='5.5' stroke='currentColor' strokeWidth='1.8' />
      <path d='m15.5 15.5 4 4' stroke='currentColor' strokeLinecap='round' strokeWidth='1.8' />
    </svg>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function getFirstContent(contents: PostContent[], type: PostContent['contentType']) {
  return contents.find((content) => content.contentType === type)?.content ?? null;
}

function getExcerpt(post: PostSummary) {
  return getFirstContent(post.contents, 'TEXT') ?? 'No preview available.';
}

function getThumbnail(post: PostSummary) {
  return getFirstContent(post.contents, 'IMAGE');
}

function PostAuthorMeta({ post }: { post: PostSummary }) {
  return (
    <div className='flex items-center gap-[0.8rem] text-[1.2rem] text-[#9b9b9b]'>
      <img
        alt={`${post.nickName} profile`}
        className='size-[2.4rem] rounded-full border border-[#ececec] object-cover'
        src={post.profileUrl}
      />
      <span className='font-medium text-[#6c6c6c]'>{post.nickName}</span>
      <span aria-hidden='true'>·</span>
      <span>{formatDate(post.createdAt)}</span>
      <span aria-hidden='true'>·</span>
      <span>{`Comments ${post.commentCount}`}</span>
    </div>
  );
}

function PostThumbnail({ post }: { post: PostSummary }) {
  const thumbnail = getThumbnail(post);

  if (thumbnail) {
    return (
      <img
        alt={post.title}
        className='h-[9.2rem] w-[9.2rem] rounded-[0.8rem] object-cover md:h-[12rem] md:w-[12rem]'
        src={thumbnail}
      />
    );
  }

  return (
    <div className='flex h-[9.2rem] w-[9.2rem] items-end rounded-[0.8rem] bg-[linear-gradient(145deg,#d9f99d_0%,#86efac_35%,#0f172a_100%)] p-[1rem] md:h-[12rem] md:w-[12rem]'>
      <span className='text-[1.1rem] font-medium text-white/90'>GITLOG</span>
    </div>
  );
}

function PostListItem({ post }: { post: PostSummary }) {
  return (
    <article className='grid grid-cols-[1fr_auto] gap-[1.6rem] border-b border-[#efefef] py-[2rem] md:gap-[2.4rem] md:py-[2.4rem]'>
      <div className='min-w-0'>
        <h2 className='truncate text-[2.4rem] font-semibold tracking-[-0.03em] text-[#111111] md:text-[3.2rem]'>
          {post.title}
        </h2>
        <p className='mt-[0.8rem] line-clamp-2 text-[1.5rem] leading-[1.55] text-[#7a7a7a] md:text-[1.8rem]'>
          {getExcerpt(post)}
        </p>
        <div className='mt-[1.6rem]'>
          <PostAuthorMeta post={post} />
        </div>
      </div>
      <PostThumbnail post={post} />
    </article>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center rounded-[2.4rem] border border-dashed border-[#d5d5d5] bg-[#fafafa] px-[2.4rem] py-[6rem] text-center'>
      <span className='text-[1.8rem] font-semibold text-[#111111]'>No posts yet</span>
      <p className='mt-[0.8rem] text-[1.4rem] text-[#7a7a7a]'>
        Create the first post to populate this feed.
      </p>
    </div>
  );
}

export default function PostList() {
  const [page, setPage] = useState(1);
  const { data } = useSuspensePostListQuery({ size: 10, page });

  return (
    <div className='min-h-screen bg-[#101010] px-[1.6rem] py-[1.6rem] md:px-[2.4rem] md:py-[2.4rem]'>
      <div className='mx-auto max-w-[120rem] overflow-hidden rounded-[2.8rem] border border-[#e6e6e6] bg-white shadow-[0_3.2rem_8rem_rgba(0,0,0,0.18)]'>
        <Header.Root className='border-b border-[#f1f1f1] px-[1.6rem] py-[1.8rem] md:px-[3.2rem]'>
          <Header.Left className='gap-[1.2rem]'>
            <Header.MenuButton aria-label='Open menu' icon={<MenuIcon />} />
            <Header.Brand className='text-[2.8rem] md:text-[3.2rem]'>GITLOG</Header.Brand>
          </Header.Left>
          <Header.Right className='gap-[0.8rem] md:gap-[1.2rem]'>
            <Header.MenuButton aria-label='Search posts' icon={<SearchIcon />} />
            <Header.ActionButton className='gap-[0.6rem] text-[#8f8f8f]'>
              <WriteIcon />
              <span className='hidden md:inline'>Write post</span>
            </Header.ActionButton>
          </Header.Right>
        </Header.Root>

        <main className='px-[1.6rem] pt-[1.2rem] pb-[2.4rem] md:px-[3.2rem] md:pt-[1.6rem] md:pb-[3.2rem]'>
          {data.posts.length > 0 ? (
            <section>
              {data.posts.map((post) => (
                <PostListItem key={post.postId} post={post} />
              ))}
            </section>
          ) : (
            <EmptyState />
          )}

          <div className='mt-[2.4rem] flex justify-center md:mt-[3.2rem]'>
            <Pagination
              currentPage={page}
              totalPages={Math.max(data.pageMax, 1)}
              onPageChange={(nextPage) => {
                startTransition(() => {
                  setPage(nextPage);
                });
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
