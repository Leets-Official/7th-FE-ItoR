import { createPost, deletePost, getPostDetail, updatePost } from '@/api/post';
import { AddPhotoAlternateIcon } from '@/assets/icons';
import DeleteForeverSvg from '@/assets/icons/common/delete_forever.svg?react';
import { Modal } from '@/components/common/Modal';
import { PageHeader } from '@/components/common/PageHeader';
import { Toast } from '@/components/common/Toast';
import { BLOG_POSTS_MOCK_RESPONSE } from '@/pages/BlogSearchPage/BlogSearchPage.mapper';
import { getAccessToken } from '@/utils/tokenStorage';
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function BlogWritePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = id ?? null;
  const isEditMode = Boolean(postId);
  const isApiPostId = Boolean(postId && postId.includes('-'));

  const post = useMemo(() => {
    if (!isEditMode || postId === null) {
      return null;
    }
    const numericId = Number(postId);
    if (!Number.isFinite(numericId)) {
      return null;
    }
    return BLOG_POSTS_MOCK_RESPONSE.find((item) => item.id === numericId) ?? null;
  }, [isEditMode, postId]);

  const isLoggedIn = Boolean(getAccessToken()) || localStorage.getItem('itor_dev_force_login') === 'true';
  const currentUserNickname = '닉네임';
  const [apiPost, setApiPost] = useState<{ title: string; content: string; isOwner: boolean } | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const canEdit = !isEditMode || (isLoggedIn && (apiPost?.isOwner ?? post?.authorNickname === currentUserNickname));

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<Array<{ id: number; file: File; url: string }>>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageSectionRef = useRef<HTMLDivElement | null>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [images]);

  useEffect(() => {
    if (selectedImageId === null) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!imageSectionRef.current?.contains(event.target as Node)) {
        setSelectedImageId(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedImageId]);

  useEffect(() => {
    if (!contentTextareaRef.current) {
      return;
    }
    contentTextareaRef.current.style.height = 'auto';
    contentTextareaRef.current.style.height = `${contentTextareaRef.current.scrollHeight}px`;
  }, [content]);

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

  useEffect(() => {
    if (!isEditMode || !postId) {
      setTitle('');
      setContent('');
      setApiPost(null);
      return;
    }

    if (!isApiPostId) {
      setTitle(post?.title ?? '');
      setContent(post?.content ?? '');
      return;
    }

    let isMounted = true;

    const loadPost = async () => {
      setIsLoadingPost(true);
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
          title: response.title,
          content: mergedText,
          isOwner: Boolean(response.isOwner),
        });
        setTitle(response.title);
        setContent(mergedText);
      } catch {
        if (!isMounted) {
          return;
        }
        setToastMessage('게시물을 불러오지 못했습니다.');
      } finally {
        if (isMounted) {
          setIsLoadingPost(false);
        }
      }
    };

    void loadPost();

    return () => {
      isMounted = false;
    };
  }, [isApiPostId, isEditMode, post?.content, post?.title, postId]);

  if (isEditMode && !isApiPostId && !post) {
    return (
      <div className="min-h-screen bg-gray-96">
        <PageHeader type="write" className="h-[72px] px-4 py-4" />
        <div className="mx-auto max-w-[688px] px-4 py-8 text-sm text-gray-56">존재하지 않는 게시물입니다.</div>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div className="min-h-screen bg-gray-96">
        <PageHeader type="write" className="h-[72px] px-4 py-4" />
        <div className="mx-auto max-w-[688px] px-4 py-8 text-sm text-gray-56">수정 권한이 없습니다.</div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      setToastMessage('제목을 입력해주세요');
      return;
    }
    if (!content.trim()) {
      setToastMessage('내용을 입력해주세요');
      return;
    }

    const payload = {
      title: title.trim(),
      contents: [
        {
          contentOrder: 1,
          content: content.trim(),
          contentType: 'TEXT' as const,
        },
      ],
    };

    try {
      if (isEditMode && postId) {
        if (isApiPostId) {
          await updatePost(postId, payload);
        }
        setToastMessage('저장되었습니다.');
        window.setTimeout(() => {
          navigate(`/blog/${postId}`);
        }, 300);
        return;
      }

      await createPost(payload);
      setToastMessage('저장되었습니다.');
      window.setTimeout(() => {
        navigate('/main');
      }, 300);
    } catch {
      setToastMessage('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    const nextImages = selectedFiles.map((file) => ({
      id: Date.now() + Math.floor(Math.random() * 10000),
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...nextImages]);
    setSelectedImageId(nextImages[nextImages.length - 1].id);
    event.target.value = '';
  };

  const handleDeleteImage = (imageId: number) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === imageId);
      if (target) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((image) => image.id !== imageId);
    });
    setSelectedImageId(null);
  };

  return (
    <div className="min-h-screen bg-white px-4">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <PageHeader
          type="write"
          className="h-[72px] border-b border-gray-96 px-4 py-4"
          onDeletePost={() => {
            if (isEditMode) {
              setShowDeleteModal(true);
              return;
            }
            navigate(-1);
          }}
          onSubmitPost={handleSubmit}
        />
      </div>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1366px] flex-col bg-white">
        {isLoadingPost ? <div className="border-b border-gray-96 px-4 py-3 text-sm text-gray-56">게시물을 불러오는 중입니다.</div> : null}
        <section className="flex h-[49px] items-center justify-center border-b border-gray-96 px-3 py-[12px]">
          <button
            type="button"
            className="inline-flex h-[25px] items-center gap-1 px-2 py-[2px] text-xs font-normal leading-[160%] tracking-[0] text-gray-56"
            onClick={() => fileInputRef.current?.click()}
          >
            <AddPhotoAlternateIcon className="h-3 w-3 shrink-0 text-gray-56 [&_*]:fill-current [&_*]:stroke-current" />
            사진 추가하기
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleSelectImage} />
        </section>

        <section className="flex h-[110px] items-center justify-center border-b border-gray-96 bg-white px-3">
          <div className="flex h-[50px] w-full max-w-[688px] items-center gap-2 px-4 py-3">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="제목"
              className={`w-full bg-transparent outline-none ${
                title.trim().length > 0
                  ? 'text-2xl font-medium leading-[160%] tracking-[0] text-black'
                  : 'text-base font-medium leading-[160%] tracking-[-0.0025em] text-gray-56 placeholder:text-gray-56'
              }`}
            />
          </div>
        </section>

        <section className="flex items-start justify-center bg-white px-3 pt-3 pb-0">
          <div className="flex w-full max-w-[688px] items-start gap-[10px] px-4 py-3">
            <textarea
              ref={contentTextareaRef}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="어떠한 것을 깨달았나요?"
              onInput={(event) => {
                const target = event.currentTarget;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
              className={`w-full resize-none overflow-hidden bg-transparent outline-none ${
                content.trim().length > 0
                  ? 'min-h-[22px] text-sm font-light leading-[160%] tracking-[-0.005em] text-gray-20'
                  : 'h-[22px] text-sm font-light leading-[160%] tracking-[-0.005em] text-gray-56 placeholder:text-gray-56'
              }`}
            />
          </div>
        </section>

        <section ref={imageSectionRef} className="flex flex-1 flex-col items-center bg-white px-0 pb-8">
          {images.map((image) => {
            const isSelected = image.id === selectedImageId;
            return (
              <div key={image.id} className="relative mt-4 w-full max-w-[688px] px-0">
                {isSelected ? (
                  <button
                    type="button"
                    className="absolute top-[-64px] left-1/2 z-10 flex h-12 w-[72px] -translate-x-1/2 items-center justify-center rounded-[4px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                    aria-label="사진 삭제"
                  >
                    <DeleteForeverSvg className="h-6 w-6 text-[#323232] [&_*]:fill-current [&_*]:stroke-current" />
                    <span className="absolute bottom-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-t-[8px] border-r-[8px] border-l-[8px] border-r-transparent border-l-transparent border-t-white" />
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => setSelectedImageId(image.id)}
                  className={`block w-full overflow-hidden border bg-white ${
                    isSelected ? 'border-[#00A1FF]' : 'border-gray-90'
                  }`}
                >
                  <img src={image.url} alt={image.file.name} className="block h-auto w-full object-cover" />
                </button>
              </div>
            );
          })}
        </section>
      </main>

      <Modal
        isOpen={showDeleteModal}
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제된 블로그는 다시 확인할 수 없어요."
        cancelText="취소"
        confirmText="삭제하기"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          const handleDelete = async () => {
            if (isEditMode && postId && isApiPostId) {
              try {
                await deletePost(postId);
                setShowDeleteModal(false);
                setToastMessage('삭제되었습니다.');
                window.setTimeout(() => navigate('/main'), 300);
              } catch {
                setToastMessage('삭제에 실패했습니다. 다시 시도해주세요.');
              }
              return;
            }

            setShowDeleteModal(false);
            setToastMessage('삭제되었습니다.');
            window.setTimeout(() => navigate('/main'), 300);
          };

          void handleDelete();
        }}
      />

      {toastMessage ? (
        <div className="fixed top-[88px] left-1/2 z-50 -translate-x-1/2">
          <Toast message={toastMessage} variant={toastMessage.includes('저장') || toastMessage.includes('삭제') ? 'success' : 'error'} />
        </div>
      ) : null}
    </div>
  );
}
