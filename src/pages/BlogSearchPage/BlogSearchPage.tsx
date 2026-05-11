import { getPostList } from '@/api/post';
import { Divider } from '@/components/common/Divider';
import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { PostListItem } from '@/components/common/PostListItem';
import { getAccessToken } from '@/utils/tokenStorage';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapBlogPostsToListItems } from './BlogSearchPage.mapper';
import { LoginPopupModal } from './LoginPopupModal';

interface LoginPageProps {
  showLoginPopup?: boolean;
}

interface BlogPostItem {
  id: string;
  title: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  commentsCount: number;
  hasThumbnail?: boolean;
  previewLines?: 1 | 2;
}

export function LoginPage({ showLoginPopup = true }: LoginPageProps) {
  const postsPerPage = 10;
  const [isLoginPopupClosed, setIsLoginPopupClosed] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const hasAccessToken = Boolean(getAccessToken());
  const shouldShowLoginPopup = showLoginPopup && !hasAccessToken && !isLoginPopupClosed;

  useEffect(() => {
    if (showLoginPopup && hasAccessToken) {
      navigate('/main', { replace: true });
    }
  }, [hasAccessToken, navigate, showLoginPopup]);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getPostList(page, postsPerPage);
        if (!isMounted) {
          return;
        }

        const mapped: BlogPostItem[] = response.posts.map((post) => ({
          id: post.postId,
          title: post.title,
          content:
            post.contents
              .filter((item) => item.contentType === 'TEXT')
              .sort((a, b) => a.contentOrder - b.contentOrder)
              .map((item) => item.content)
              .join(' ')
              .trim() || '-',
          authorNickname: post.nickName,
          createdAt: post.createdAt,
          commentsCount: post.commentCount,
          hasThumbnail: post.contents.some((item) => item.contentType === 'IMAGE'),
          previewLines: 2,
        }));

        setPosts(mapped);
        setTotalPages(Math.max(response.pageMax, 1));
      } catch {
        if (!isMounted) {
          return;
        }
        setPosts([]);
        setTotalPages(1);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadPosts();

    return () => {
      isMounted = false;
    };
  }, [page, postsPerPage]);

  const postListItems = useMemo(() => mapBlogPostsToListItems(posts), [posts]);

  return (
    <div className="relative min-h-screen bg-white">
      <PageHeader type="main" className="h-[72px] px-4 py-4" />

      <main className="mx-auto flex w-full max-w-[688px] flex-col">
        <div className="h-8" aria-hidden="true" />
        {isLoading ? <div className="px-4 py-8 text-sm text-gray-56">게시글을 불러오는 중입니다.</div> : null}

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
              onClick={() => navigate(`/blog/${post.id}`)}
            />
            <Divider color="gray96" />
          </div>
        ))}

        <div className="mt-8 mb-16 flex h-8 items-center justify-center px-[10px]">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </main>

      {shouldShowLoginPopup ? <LoginPopupModal onClose={() => setIsLoginPopupClosed(true)} /> : null}
    </div>
  );
}
