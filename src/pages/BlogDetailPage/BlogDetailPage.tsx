import { deleteComment } from '@/api/comment';
import { deletePost, getPostDetail } from '@/api/post';
import { Modal } from '@/components/common/Modal';
import { PageHeader } from '@/components/common/PageHeader';
import { PictureFrame } from '@/components/common/PictureFrame';
import { Profile } from '@/components/common/Profile';
import { Toast } from '@/components/common/Toast';
import { BLOG_POSTS_MOCK_RESPONSE } from '@/pages/BlogSearchPage/BlogSearchPage.mapper';
import { getAccessToken } from '@/utils/tokenStorage';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogTitleSection } from './BlogTitleSection';
import { CommentField } from './CommentField';
import { CommentItem } from './CommentItem';

export function BlogDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = id ?? null;
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '닉네임',
      dateText: 'Fed 17. 2025.',
      isMine: true,
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      id: 2,
      author: '닉네임',
      dateText: 'Fed 17. 2025.',
      isMine: false,
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
  ]);
  const [openedMenuCommentId, setOpenedMenuCommentId] = useState<number | null>(null);
  const [deleteTargetCommentId, setDeleteTargetCommentId] = useState<number | null>(null);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [apiPost, setApiPost] = useState<{
    postId: string;
    title: string;
    content: string;
    authorNickname: string;
    createdAt: string;
    isOwner: boolean;
  } | null>(null);

  // DEV fallback: API 로그인 불가 시 localStorage 플래그로 로그인 상태를 강제
  // 브라우저 콘솔에서 `localStorage.setItem('itor_dev_force_login', 'true')` 로 켤 수 있음
  const isLoggedIn = useMemo(() => {
    const hasAccessToken = Boolean(getAccessToken());
    const forceLogin = localStorage.getItem('itor_dev_force_login') === 'true';
    return hasAccessToken || forceLogin;
  }, []);
  const commentFieldVariant = !isLoggedIn ? 'loggedOut' : commentInput.trim().length > 0 ? 'writing' : 'active';
  const currentUserNickname = '닉네임';
  const post = useMemo(() => {
    if (postId === null) {
      return null;
    }
    const numericId = Number(postId);
    if (!Number.isFinite(numericId)) {
      return null;
    }
    return BLOG_POSTS_MOCK_RESPONSE.find((item) => item.id === numericId) ?? null;
  }, [postId]);
  const isPostAuthor = isLoggedIn && (apiPost?.isOwner ?? post?.authorNickname === currentUserNickname);

  useEffect(() => {
    if (!postId || !postId.includes('-')) {
      setApiPost(null);
      return;
    }

    let isMounted = true;

    const loadPost = async () => {
      try {
        const response = await getPostDetail(postId);
        if (!isMounted) {
          return;
        }
        const sorted = [...response.contents].sort((a, b) => a.contentOrder - b.contentOrder);
        const mergedText = sorted
          .filter((item) => item.contentType === 'TEXT')
          .map((item) => item.content)
          .join('\n\n')
          .trim();

        setApiPost({
          postId: response.postId,
          title: response.title,
          content: mergedText,
          authorNickname: response.nickName ?? '닉네임',
          createdAt: response.createdAt ?? 'Fed 17. 2025.',
          isOwner: Boolean(response.isOwner),
        });
      } catch {
        if (!isMounted) {
          return;
        }
        setApiPost(null);
      }
    };

    void loadPost();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  useEffect(() => {
    if (!openedMenuCommentId && !isPostMenuOpen) {
      return;
    }

    const handleOutsideClick = () => {
      setOpenedMenuCommentId(null);
      setIsPostMenuOpen(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openedMenuCommentId, isPostMenuOpen]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toastMessage]);

  const handleCommentButtonClick = () => {
    const commentSection = document.getElementById('comment-section');
    if (!commentSection) return;
    commentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRequireLogin = () => {
    navigate('/login');
  };

  const handleSubmitComment = () => {
    const next = commentInput.trim();
    if (!next) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: '닉네임',
        dateText: 'Fed 17. 2025.',
        isMine: true,
        content: next,
      },
    ]);
    setCommentInput('');
  };

  const handleToggleMenu = (commentId: number) => {
    setOpenedMenuCommentId((prev) => (prev === commentId ? null : commentId));
  };

  const handleDeleteClick = (commentId: number) => {
    setDeleteTargetCommentId(commentId);
    setIsCommentDeleteModalOpen(true);
    setOpenedMenuCommentId(null);
  };

  const handleTogglePostMenu = () => {
    setIsPostMenuOpen((prev) => !prev);
  };

  const handleEditPost = () => {
    setIsPostMenuOpen(false);
    if (!postId) {
      return;
    }
    navigate(`/blog/${postId}/edit`);
  };

  const handleDeletePostClick = () => {
    setIsPostMenuOpen(false);
    setIsPostDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetCommentId || isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteComment(deleteTargetCommentId);
      setComments((prev) => prev.filter((comment) => comment.id !== deleteTargetCommentId));
      setToastMessage('삭제가 완료되었습니다.');
    } catch {
      setToastMessage('삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setDeleteTargetCommentId(null);
      setIsCommentDeleteModalOpen(false);
      setIsDeleting(false);
    }
  };

  const handleDeletePostConfirm = async () => {
    if (isDeleting) {
      return;
    }
    if (!postId) {
      return;
    }

    setIsDeleting(true);
    try {
      if (postId.includes('-')) {
        await deletePost(postId);
      }
      setIsPostDeleteModalOpen(false);
      setToastMessage('삭제되었습니다.');
      window.setTimeout(() => {
        navigate('/main');
      }, 300);
    } catch {
      setToastMessage('삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-96">
      <div className="w-full bg-white">
        <PageHeader
          type="detail"
          className="h-[72px] border-b border-gray-90 px-4 py-4"
          onCommentClick={handleCommentButtonClick}
          canManagePost={isPostAuthor}
          isPostMenuOpen={isPostMenuOpen}
          onTogglePostMenu={handleTogglePostMenu}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePostClick}
        />
      </div>

      <BlogTitleSection
        title={apiPost?.title ?? post?.title ?? '32 Title one line'}
        author={apiPost?.authorNickname ?? post?.authorNickname ?? '닉네임'}
        dateText={apiPost?.createdAt ?? post?.createdAt ?? 'Fed 17. 2025.'}
        commentCount={comments.length}
      />

      <section className="w-full border-b border-gray-90 bg-white">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="mx-auto w-full max-w-[688px]">
            <div className="h-5 md:h-8" aria-hidden="true" />
            <div className="w-full px-4 py-3">
              <p className="w-full text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">
                {apiPost?.content ??
                  post?.content ??
                  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and
                scrambled it to make a type specimen book.`}
              </p>
            </div>

            <div className="w-full px-4 py-3">
              <PictureFrame size="big">
                <div className="h-[137px] w-full rounded-[4px] bg-[#1E1F22] p-3">
                  <pre className="m-0 overflow-x-auto text-sm font-regular leading-[160%] tracking-[-0.07px] text-[#DCDCDC]">
                    <code>{`@Mapper
public interface TestMapper{
  voidUpdateHuman(TestDto testDto, @MappingTarget Test test);
}`}</code>
                  </pre>
                </div>
              </PictureFrame>
            </div>

            <div className="w-full px-4 py-3">
              <p className="w-full text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>

            <div className="w-full px-4 py-3">
              <PictureFrame size="big">
                <div className="h-[681px] w-full rounded-[4px] bg-[#1E1F22] p-3">
                  <pre className="m-0 overflow-x-auto text-sm font-regular leading-[160%] tracking-[-0.07px] text-[#DCDCDC]">
                    <code>{`Declares a parameter of a mapping method to be the target of the mapping.
No more than one parameter can be declared as MappingTarget.
NOTE: The parameter passed as a mapping target must not be null.

@Mapper
public interface HumanMapper {
  void updateHuman(HumanDto humanDto, @MappingTarget Human human);
}

// generates
@Override
public void updateHuman(HumanDto humanDto, Human human) {
  human.setName( humanDto.getName() );
}

Example 2: Update exist bean and return it

@Mapper
public interface HumanMapper {
  Human updateHuman(HumanDto humanDto, @MappingTarget Human human);
}

// generates
@Override
public Human updateHuman(HumanDto humanDto, Human human) {
  human.setName( humanDto.getName() );
  return human;
}`}</code>
                  </pre>
                </div>
              </PictureFrame>
            </div>
            <div className="h-8" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="comment-section" className="w-full scroll-mt-[82px] border-b border-gray-90 bg-white">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="mx-auto w-full max-w-[688px]">
            <div className="flex h-[54px] items-center gap-[10px] px-4 py-3">
              <span className="text-base font-medium leading-[160%] tracking-[-0.08px] text-black">댓글</span>
              <span className="text-base font-medium leading-[160%] tracking-[-0.08px] text-primary">{comments.length}</span>
            </div>

            {comments.length === 0 ? (
              <>
                <div className="h-5" aria-hidden="true" />
                <div className="flex h-[44px] items-center justify-center px-4 py-3">
                  <p className="text-center text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-78">
                    작성된 댓글이 없습니다.
                    <br />
                    응원의 첫 번째 댓글을 달아주세요.
                  </p>
                </div>
                <div className="h-5" aria-hidden="true" />
              </>
            ) : null}

            <div className="flex flex-col gap-[10px]">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  id={comment.id}
                  author={comment.author}
                  dateText={comment.dateText}
                  content={comment.content}
                  canManage={isLoggedIn && comment.isMine}
                  isMenuOpen={openedMenuCommentId === comment.id}
                  onToggleMenu={handleToggleMenu}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>

            <div className="h-5" aria-hidden="true" />

            <CommentField
              variant={commentFieldVariant}
              value={commentInput}
              onChange={setCommentInput}
              onSubmit={handleSubmitComment}
              onRequireLogin={handleRequireLogin}
            />

            <div className="h-16" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="w-full border-b border-gray-90 bg-gray-96">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="mx-auto w-full max-w-[688px]">
            <div className="h-12 md:h-16" aria-hidden="true" />
            <div className="flex w-full flex-col gap-[10px] px-4 py-3">
              <Profile size={2} className="h-16 w-16" />
              <div className="flex w-full flex-col gap-3 px-4 py-3">
                <span className="text-[44px] font-medium leading-[130%] tracking-[0] text-black md:text-2xl md:leading-[160%]">
                  %{'{닉네임}'}
                </span>
                <span className="text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">%{'{한 줄 소개}'}</span>
              </div>
            </div>
            <div className="h-12 md:h-16" aria-hidden="true" />
            <div className="h-8 md:h-[42px]" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Modal
        isOpen={isCommentDeleteModalOpen}
        title="댓글을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제하기"
        onClose={() => {
          if (isDeleting) {
            return;
          }
          setIsCommentDeleteModalOpen(false);
          setDeleteTargetCommentId(null);
        }}
        onConfirm={() => {
          void handleDeleteConfirm();
        }}
      />
      <Modal
        isOpen={isPostDeleteModalOpen}
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제된 블로그는 다시 확인할 수 없어요."
        cancelText="취소"
        confirmText="삭제하기"
        onClose={() => {
          if (isDeleting) {
            return;
          }
          setIsPostDeleteModalOpen(false);
        }}
        onConfirm={() => {
          void handleDeletePostConfirm();
        }}
      />

      {toastMessage ? (
        <div className="fixed top-[88px] left-1/2 z-50 -translate-x-1/2">
          <Toast message={toastMessage} variant={toastMessage.includes('완료') ? 'success' : 'error'} />
        </div>
      ) : null}
    </div>
  );
}
