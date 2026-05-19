import { getPostList } from '@/api/post';
import { Divider } from '@/components/common/Divider';
import { PageHeader } from '@/components/common/PageHeader';
import { PostListItem } from '@/components/common/PostListItem';
import { ProfileCard } from '@/components/common/ProfileCard';
import { getAccessToken } from '@/utils/tokenStorage';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface BlogPostItem {
  id: string;
  title: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  commentsCount: number;
  hasThumbnail?: boolean;
}

export function MyPageHomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostItem[]>([]);

  const authOverride = searchParams.get('auth');
  const isLoggedIn = useMemo(() => {
    if (authOverride === 'member') {
      return true;
    }
    if (authOverride === 'guest') {
      return false;
    }
    return Boolean(getAccessToken());
  }, [authOverride]);

  useEffect(() => {
    let isMounted = true;
    const loadPosts = async () => {
      try {
        const response = await getPostList(1, 10);
        if (!isMounted) {
          return;
        }

        setPosts(
          response.posts.map((post) => ({
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
          })),
        );
      } catch {
        if (!isMounted) {
          return;
        }
        setPosts([]);
      }
    };

    void loadPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader type="main" className="h-[72px] border-b border-gray-90 px-4 py-4" authStateOverride={isLoggedIn ? 'member' : 'guest'} />

      <main className="mx-auto flex w-full max-w-[1366px] bg-white">
        <ProfileCard
          variant={isLoggedIn ? 'member' : 'guest'}
          startButtonLabel="로그인하기"
          startButtonProps={{ onClick: () => navigate('/login') }}
          myGitlogButtonProps={{ onClick: () => navigate('/mypage') }}
          writeGitlogButtonProps={{ onClick: () => navigate('/blog/write') }}
          settingButtonProps={{ onClick: () => navigate('/signup/email?auth=member') }}
          logoutButtonProps={{ onClick: () => navigate('/login') }}
        />

        <section className="w-[1126px]">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <PostListItem
                title={post.title}
                description={post.content}
                nickname={post.authorNickname}
                date={post.createdAt}
                commentCount={post.commentsCount}
                showThumbnail={post.hasThumbnail}
                onClick={() => navigate(`/blog/${post.id}`)}
              />
              <Divider color="gray96" />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
