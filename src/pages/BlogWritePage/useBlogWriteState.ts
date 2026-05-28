import { createPost, deletePost, updatePost } from '@/api/post';
import { getPresignedImageUrl, getPublicImageUrlFromPresignedUrl, uploadImageToPresignedUrl } from '@/api/image';
import { useApiPostDetail, useAutoClearMessage } from '@/hooks';
import { BLOG_POSTS_MOCK_RESPONSE } from '@/pages/BlogSearchPage/BlogSearchPage.mapper';
import { isLoggedInUser } from '@/utils/auth';
import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface WriteImageItem {
  id: number;
  file: File | null;
  name: string;
  previewUrl: string;
  uploadedUrl: string;
}

export function useBlogWriteState(postId: string | null) {
  const navigate = useNavigate();
  const isEditMode = Boolean(postId);
  const isApiPostId = Boolean(postId && postId.includes('-'));

  const post = useMemo(() => {
    if (!isEditMode || postId === null) return null;
    const numericId = Number(postId);
    if (!Number.isFinite(numericId)) return null;
    return BLOG_POSTS_MOCK_RESPONSE.find((item) => item.id === numericId) ?? null;
  }, [isEditMode, postId]);

  const isLoggedIn = isLoggedInUser();
  const { post: apiPost, isLoading: isLoadingPost, hasError: hasApiPostError } = useApiPostDetail(postId, { enabled: isApiPostId });
  const canEdit = !isEditMode || (isLoggedIn && (apiPost?.isOwner ?? post?.authorNickname === '닉네임'));

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<WriteImageItem[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageSectionRef = useRef<HTMLDivElement | null>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imagesRef = useRef<WriteImageItem[]>([]);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        if (image.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (selectedImageId === null) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!imageSectionRef.current?.contains(event.target as Node)) setSelectedImageId(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [selectedImageId]);

  useEffect(() => {
    if (!contentTextareaRef.current) return;
    contentTextareaRef.current.style.height = 'auto';
    contentTextareaRef.current.style.height = `${contentTextareaRef.current.scrollHeight}px`;
  }, [content]);

  const clearToast = useCallback(() => setToastMessage(null), []);
  useAutoClearMessage(toastMessage, clearToast);

  useEffect(() => {
    if (!isEditMode || !postId) {
      setTitle('');
      setContent('');
      setImages([]);
      return;
    }
    if (!isApiPostId) {
      setTitle(post?.title ?? '');
      setContent(post?.content ?? '');
      setImages([]);
    }
  }, [isApiPostId, isEditMode, post?.content, post?.title, postId]);

  useEffect(() => {
    if (!apiPost) return;
    setTitle(apiPost.title);
    setContent(apiPost.content);
    setImages(
      apiPost.contents
        .filter((item) => item.contentType === 'IMAGE')
        .sort((a, b) => a.contentOrder - b.contentOrder)
        .map((item, index) => ({
          id: Date.now() + index,
          file: null,
          name: `existing-image-${index + 1}`,
          previewUrl: item.content,
          uploadedUrl: item.content,
        })),
    );
  }, [apiPost]);

  useEffect(() => {
    if (hasApiPostError) setToastMessage('게시물을 불러오지 못했습니다.');
  }, [hasApiPostError]);

  const handleSubmit = async () => {
    if (!title.trim()) return setToastMessage('제목을 입력해주세요');
    if (!content.trim()) return setToastMessage('내용을 입력해주세요');

    const imageContents = images.map((image, index) => ({
      contentOrder: index + 2,
      content: image.uploadedUrl,
      contentType: 'IMAGE' as const,
    }));
    const payload = {
      title: title.trim(),
      contents: [{ contentOrder: 1, content: content.trim(), contentType: 'TEXT' as const }, ...imageContents],
    };

    try {
      if (isEditMode && postId) {
        if (isApiPostId) await updatePost(postId, payload);
        setToastMessage('저장되었습니다.');
        window.setTimeout(() => navigate(`/blog/${postId}`), 300);
        return;
      }
      await createPost(payload);
      setToastMessage('저장되었습니다.');
      window.setTimeout(() => navigate('/main'), 300);
    } catch {
      setToastMessage('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSelectImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) return;

    try {
      const nextImages = await Promise.all(
        selectedFiles.map(async (file) => {
          const uploadUrl = await getPresignedImageUrl(file.name);
          await uploadImageToPresignedUrl(uploadUrl, file);

          return {
            id: Date.now() + Math.floor(Math.random() * 10000),
            file,
            name: file.name,
            previewUrl: URL.createObjectURL(file),
            uploadedUrl: getPublicImageUrlFromPresignedUrl(uploadUrl),
          };
        }),
      );

      setImages((prev) => [...prev, ...nextImages]);
      setSelectedImageId(nextImages.at(-1)?.id ?? null);
    } catch {
      setToastMessage('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }

    event.target.value = '';
  };

  const handleDeleteImage = (imageId: number) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === imageId);
      if (target?.previewUrl.startsWith('blob:')) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((image) => image.id !== imageId);
    });
    setSelectedImageId(null);
  };

  const handleDeletePost = async () => {
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

  return {
    isEditMode,
    isApiPostId,
    post,
    canEdit,
    isLoadingPost,
    title,
    content,
    images,
    selectedImageId,
    toastMessage,
    showDeleteModal,
    fileInputRef,
    imageSectionRef,
    contentTextareaRef,
    setTitle,
    setContent,
    setSelectedImageId,
    setShowDeleteModal,
    handleSubmit,
    handleSelectImage,
    handleDeleteImage,
    handleDeletePost,
    navigate,
  };
}
