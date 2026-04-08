import { Link, useParams } from 'react-router';
import { type PostComment, type PostContent, useSuspensePostDetailQuery } from '@/apis';
import { ROUTE_PATH } from '@apps/routes/path.ts';

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

function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function getImageSrc(src: string | null | undefined) {
  const normalizedSrc = src?.trim();

  return normalizedSrc ? normalizedSrc : null;
}

function getOrderedContents(contents: PostContent[]) {
  return [...contents].sort((left, right) => left.contentOrder - right.contentOrder);
}

function PostBody({ contents }: { contents: PostContent[] }) {
  return (
    <div className='space-y-[2rem] md:space-y-[2.4rem]'>
      {getOrderedContents(contents).map((content) => {
        const imageSrc = getImageSrc(content.content);

        if (content.contentType === 'IMAGE' && imageSrc) {
          return (
            <img
              key={`${content.contentOrder}-${content.content}`}
              alt='Post content'
              className='max-h-[52rem] w-full rounded-[1.6rem] border border-[#efefef] bg-[#fafafa] object-cover'
              src={imageSrc}
            />
          );
        }

        return (
          <p
            key={`${content.contentOrder}-${content.content}`}
            className='text-[1.6rem] leading-[1.9] break-words whitespace-pre-wrap text-[#4b4b4b] md:text-[1.8rem]'
          >
            {content.content}
          </p>
        );
      })}
    </div>
  );
}

function CommentItem({ comment }: { comment: PostComment }) {
  const profileImageSrc = getImageSrc(comment.profileUrl);

  return (
    <article className='flex gap-[1.2rem] rounded-[1.6rem] border border-[#efefef] bg-white p-[1.6rem]'>
      {profileImageSrc ? (
        <img
          alt={`${comment.nickName} profile`}
          className='mt-[0.2rem] size-[4rem] rounded-full border border-[#ececec] object-cover'
          src={profileImageSrc}
        />
      ) : (
        <div className='mt-[0.2rem] flex size-[4rem] shrink-0 items-center justify-center rounded-full bg-[#111111] text-[1.4rem] font-semibold text-white'>
          {comment.nickName.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-[0.8rem]'>
          <strong className='text-[1.4rem] text-[#111111]'>{comment.nickName}</strong>
          <span className='text-[1.2rem] text-[#9b9b9b]'>{formatDateTime(comment.createdAt)}</span>
          {comment.isOwner ? (
            <span className='rounded-full bg-[#111111] px-[0.8rem] py-[0.2rem] text-[1.1rem] font-medium text-white'>
              내 댓글
            </span>
          ) : null}
        </div>
        <p className='mt-[0.8rem] text-[1.4rem] leading-[1.7] break-words whitespace-pre-wrap text-[#4b4b4b]'>
          {comment.content}
        </p>
      </div>
    </article>
  );
}

function CommentSection({ comments }: { comments: PostComment[] }) {
  return (
    <section className='border-t border-[#f1f1f1] px-[1.6rem] py-[2.4rem] md:px-[3.2rem] md:py-[3.2rem]'>
      <div className='flex items-center gap-[0.8rem]'>
        <h2 className='text-[1.8rem] font-semibold text-[#111111]'>댓글</h2>
        <span className='text-[1.6rem] text-[#2b7fff]'>{comments.length}</span>
      </div>

      {comments.length > 0 ? (
        <div className='mt-[1.6rem] space-y-[1.2rem]'>
          {comments.map((comment) => (
            <CommentItem key={comment.commentId} comment={comment} />
          ))}
        </div>
      ) : (
        <div className='mt-[1.6rem] rounded-[1.6rem] border border-dashed border-[#dddddd] bg-[#fafafa] px-[2rem] py-[4rem] text-center'>
          <p className='text-[1.4rem] text-[#999999]'>작성된 댓글이 없습니다.</p>
          <p className='mt-[0.4rem] text-[1.3rem] text-[#b0b0b0]'>
            공감의 첫 번째 댓글을 남겨주세요.
          </p>
        </div>
      )}

      <div className='mt-[2rem] rounded-[1.6rem] border border-[#e6e6e6] bg-[#fcfcfc] px-[1.6rem] py-[1.8rem] text-[1.4rem] text-[#8c8c8c]'>
        로그인 후 댓글을 작성할 수 있어요.
      </div>
    </section>
  );
}

function AuthorCard({
  nickName,
  profileUrl,
  introduction,
}: {
  nickName: string;
  profileUrl: string;
  introduction: string;
}) {
  const profileImageSrc = getImageSrc(profileUrl);

  return (
    <section className='border-t border-[#f1f1f1] bg-[#f7f7f7] px-[1.6rem] py-[3.2rem] md:px-[3.2rem] md:py-[4.8rem]'>
      <div className='mx-auto flex max-w-[72rem] items-center gap-[1.6rem] md:gap-[2rem]'>
        {profileImageSrc ? (
          <img
            alt={`${nickName} profile`}
            className='size-[6.4rem] rounded-full border border-white object-cover shadow-[0_1rem_3rem_rgba(0,0,0,0.08)] md:size-[8rem]'
            src={profileImageSrc}
          />
        ) : (
          <div className='flex size-[6.4rem] items-center justify-center rounded-full bg-[#111111] text-[2rem] font-semibold text-white shadow-[0_1rem_3rem_rgba(0,0,0,0.08)] md:size-[8rem] md:text-[2.4rem]'>
            {nickName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className='text-[2rem] font-semibold tracking-[-0.03em] text-[#111111] md:text-[2.6rem]'>
            {nickName}
          </h2>
          <p className='mt-[0.6rem] text-[1.4rem] leading-[1.7] text-[#6f6f6f] md:text-[1.5rem]'>
            {introduction || '소개가 아직 등록되지 않았습니다.'}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PostDetail() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error('게시글 id가 없습니다.');
  }

  const { data } = useSuspensePostDetailQuery({ postId });
  const profileImageSrc = getImageSrc(data.profileUrl);

  return (
    <div>
      <section className='px-[1.6rem] py-[3.2rem] md:px-[3.2rem] md:py-[5.6rem]'>
        <div className='mx-auto max-w-[72rem]'>
          <div className='mb-[1.8rem]'>
            <Link
              className='inline-flex items-center text-[1.3rem] font-medium text-[#8f8f8f] transition-colors hover:text-[#111111]'
              to={ROUTE_PATH.POST.LIST}
            >
              목록으로
            </Link>
          </div>
          <h1 className='text-[3rem] font-semibold tracking-[-0.04em] text-[#111111] md:text-[4.6rem]'>
            {data.title}
          </h1>

          <div className='mt-[2rem] flex flex-wrap items-center gap-[0.8rem] text-[1.2rem] text-[#9b9b9b] md:text-[1.3rem]'>
            {profileImageSrc ? (
              <img
                alt={`${data.nickName} profile`}
                className='size-[2.8rem] rounded-full border border-[#ececec] object-cover'
                src={profileImageSrc}
              />
            ) : (
              <div className='flex size-[2.8rem] items-center justify-center rounded-full bg-[#111111] text-[1.1rem] font-semibold text-white'>
                {data.nickName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <span className='font-medium text-[#6c6c6c]'>{data.nickName}</span>
            <span aria-hidden='true'>·</span>
            <span>{formatDate(data.createdAt)}</span>
            {data.isOwner ? (
              <>
                <span aria-hidden='true'>·</span>
                <span className='font-medium text-[#111111]'>내 게시글</span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className='border-t border-[#f1f1f1] px-[1.6rem] py-[2.4rem] md:px-[3.2rem] md:py-[3.2rem]'>
        <div className='mx-auto max-w-[72rem]'>
          <PostBody contents={data.contents} />
        </div>
      </section>

      <div className='mx-auto max-w-[78.4rem]'>
        <CommentSection comments={data.comments} />
      </div>

      <AuthorCard
        introduction={data.introduction}
        nickName={data.nickName}
        profileUrl={data.profileUrl}
      />
    </div>
  );
}
