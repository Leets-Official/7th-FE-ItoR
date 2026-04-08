import { startTransition, useState } from 'react';
import { Link } from 'react-router';
import { getAccessToken } from '@apis/core';
import { useSuspensePostListQuery, type PostContent, type PostSummary } from '@/apis';
import { ROUTE_PATH } from '@apps/routes/path.ts';
import { Pagination } from '@shared/ui';
import PostAccessAuthModals from '@pages/post/post-list/components/post-access-auth-modals/PostAccessAuthModals.tsx';

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

function getImageSrc(src: string | null | undefined) {
  const normalizedSrc = src?.trim();

  return normalizedSrc ? normalizedSrc : null;
}

function PostAuthorMeta({ post }: { post: PostSummary }) {
  const profileImageSrc = getImageSrc(post.profileUrl);

  return (
    <div className='flex items-center gap-[0.8rem] text-[1.2rem] text-[#9b9b9b]'>
      {profileImageSrc ? (
        <img
          alt={`${post.nickName} profile`}
          className='size-[2.4rem] rounded-full border border-[#ececec] object-cover'
          src={profileImageSrc}
        />
      ) : (
        <div className='flex size-[2.4rem] items-center justify-center rounded-full bg-[#111111] text-[1rem] font-semibold text-white'>
          {post.nickName.slice(0, 1).toUpperCase()}
        </div>
      )}
      <span className='font-medium text-[#6c6c6c]'>{post.nickName}</span>
      <span aria-hidden='true'>·</span>
      <span>{formatDate(post.createdAt)}</span>
      <span aria-hidden='true'>·</span>
      <span>{`Comments ${post.commentCount}`}</span>
    </div>
  );
}

function PostThumbnail({ post }: { post: PostSummary }) {
  const thumbnail = getImageSrc(getThumbnail(post));

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

function PostListItem({ post, onRequireAuth }: { post: PostSummary; onRequireAuth: () => void }) {
  return (
    <article className='border-b border-[#efefef]'>
      <Link
        className='grid grid-cols-[1fr_auto] gap-[1.6rem] py-[2rem] transition-opacity hover:opacity-80 md:gap-[2.4rem] md:py-[2.4rem]'
        onClick={(event) => {
          if (getAccessToken()) {
            return;
          }

          event.preventDefault();
          onRequireAuth();
        }}
        to={ROUTE_PATH.POST.DETAIL(post.postId)}
      >
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
      </Link>
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
  const [isAuthConfirmOpen, setIsAuthConfirmOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data } = useSuspensePostListQuery({ size: 10, page });

  return (
    <>
      <div className='px-[1.6rem] pt-[1.2rem] pb-[2.4rem] md:px-[3.2rem] md:pt-[1.6rem] md:pb-[3.2rem]'>
        {data.posts.length > 0 ? (
          <section>
            {data.posts.map((post) => (
              <PostListItem
                key={post.postId}
                onRequireAuth={() => {
                  setIsAuthConfirmOpen(true);
                }}
                post={post}
              />
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
      </div>

      <PostAccessAuthModals
        authOpen={isAuthModalOpen}
        confirmOpen={isAuthConfirmOpen}
        onAuthOpenChange={setIsAuthModalOpen}
        onConfirmOpenChange={setIsAuthConfirmOpen}
        onProceedSignup={() => {
          setIsAuthConfirmOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
    </>
  );
}
