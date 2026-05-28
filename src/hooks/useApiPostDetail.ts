import { getPostDetail, type PostContentRequest } from '@/api/post';
import { mergePostTextContents } from '@/utils/postContent';
import { useEffect, useState } from 'react';

interface ApiPostDetailState {
  postId: string;
  title: string;
  content: string;
  contents: PostContentRequest[];
  comments: Array<{
    id: number;
    author: string;
    dateText: string;
    isMine: boolean;
    content: string;
  }>;
  authorNickname: string;
  createdAt: string;
  isOwner: boolean;
}

interface UseApiPostDetailOptions {
  enabled?: boolean;
}

export function useApiPostDetail(postId: string | null, options: UseApiPostDetailOptions = {}) {
  const { enabled = true } = options;
  const [post, setPost] = useState<ApiPostDetailState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!enabled || !postId) {
      setPost(null);
      setHasError(false);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadPost = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await getPostDetail(postId);
        if (!isMounted) {
          return;
        }

        setPost({
          postId: response.postId,
          title: response.title,
          content: mergePostTextContents(response.contents, { separator: '\n\n' }),
          contents: response.contents,
          comments: (response.comments ?? []).map((comment) => ({
            id: comment.commentId,
            author: comment.nickName,
            dateText: comment.createdAt,
            isMine: Boolean(comment.isOwner),
            content: comment.content,
          })),
          authorNickname: response.nickName ?? '닉네임',
          createdAt: response.createdAt ?? 'Fed 17. 2025.',
          isOwner: Boolean(response.isOwner),
        });
      } catch {
        if (!isMounted) {
          return;
        }
        setPost(null);
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadPost();

    return () => {
      isMounted = false;
    };
  }, [enabled, postId]);

  return { post, isLoading, hasError };
}
