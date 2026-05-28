import { createComment, deleteComment } from '@/api/comment';
import { deletePost, getPostDetail } from '@/api/post';
import { useApiPostDetail, useAutoClearMessage } from '@/hooks';
import { BLOG_POSTS_MOCK_RESPONSE } from '@/pages/BlogSearchPage/BlogSearchPage.mapper';
import { isLoggedInUser } from '@/utils/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface BlogCommentItem {
  id: number;
  author: string;
  dateText: string;
  isMine: boolean;
  content: string;
}

const INITIAL_COMMENTS: BlogCommentItem[] = [
  {
    id: 1,
    author: '닉네임',
    dateText: 'Fed 17. 2025.',
    isMine: true,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    author: '닉네임',
    dateText: 'Fed 17. 2025.',
    isMine: false,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export function useBlogDetailState(postId: string | null) {
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<BlogCommentItem[]>(INITIAL_COMMENTS);
  const [openedMenuCommentId, setOpenedMenuCommentId] = useState<number | null>(null);
  const [deleteTargetCommentId, setDeleteTargetCommentId] = useState<number | null>(null);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isLoggedIn = isLoggedInUser();
  const isApiPostId = Boolean(postId && postId.includes('-'));
  const { post: apiPost } = useApiPostDetail(postId, { enabled: isApiPostId });
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
  const commentFieldVariant: 'loggedOut' | 'active' | 'writing' =
    !isLoggedIn ? 'loggedOut' : commentInput.trim().length > 0 ? 'writing' : 'active';

  useEffect(() => {
    if (!isApiPostId || !apiPost) {
      return;
    }
    setComments(apiPost.comments);
  }, [apiPost, isApiPostId]);

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

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);
  useAutoClearMessage(toastMessage, clearToast);

  const handleCommentButtonClick = () => {
    const commentSection = document.getElementById('comment-section');
    if (!commentSection) return;
    commentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitComment = async () => {
    const next = commentInput.trim();
    if (!next) return;

    const apiPostId = postId && postId.includes('-') ? postId : null;
    const isCreatableWithApi = Boolean(apiPostId && isLoggedIn);

    if (!isCreatableWithApi) {
      setComments((prev) => [...prev, { id: Date.now(), author: '닉네임', dateText: 'Fed 17. 2025.', isMine: true, content: next }]);
      setCommentInput('');
      return;
    }
    if (!apiPostId) {
      return;
    }

    try {
      const createdComment = await createComment(apiPostId, { content: next });
      const createdCommentId =
        typeof createdComment === 'object' && createdComment !== null && 'commentId' in createdComment
          ? Number((createdComment as { commentId?: number }).commentId)
          : NaN;

      if (Number.isFinite(createdCommentId)) {
        setComments((prev) => [
          ...prev,
          {
            id: createdCommentId,
            author: '닉네임',
            dateText: '방금 전',
            isMine: true,
            content: next,
          },
        ]);
      } else {
        const postDetail = await getPostDetail(apiPostId);
        setComments(
          (postDetail.comments ?? []).map((comment) => ({
            id: comment.commentId,
            author: comment.nickName,
            dateText: comment.createdAt,
            isMine: Boolean(comment.isOwner),
            content: comment.content,
          })),
        );
      }
      setCommentInput('');
      setToastMessage('댓글이 등록되었습니다.');
    } catch {
      setToastMessage('댓글 등록에 실패했습니다. 다시 시도해주세요.');
    }
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
    if (isDeleting || !postId) {
      return;
    }

    setIsDeleting(true);
    try {
      if (postId.includes('-')) {
        await deletePost(postId);
      }
      setIsPostDeleteModalOpen(false);
      setToastMessage('삭제되었습니다.');
      window.setTimeout(() => navigate('/main'), 300);
    } catch {
      setToastMessage('삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    apiPost,
    post,
    comments,
    commentInput,
    commentFieldVariant,
    openedMenuCommentId,
    isCommentDeleteModalOpen,
    isPostMenuOpen,
    isPostDeleteModalOpen,
    isDeleting,
    toastMessage,
    isLoggedIn,
    isPostAuthor,
    setCommentInput,
    setOpenedMenuCommentId,
    setDeleteTargetCommentId,
    setIsCommentDeleteModalOpen,
    setIsPostMenuOpen,
    setIsPostDeleteModalOpen,
    handleCommentButtonClick,
    handleSubmitComment,
    handleDeleteConfirm,
    handleDeletePostConfirm,
    navigate,
  };
}
