import type { PostListItemProps } from '@/components/common/PostListItem/PostListItem.types';

type BlogPostApiResponse = {
  id: string | number;
  title: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  commentsCount: number;
  hasThumbnail?: boolean;
  previewLines?: 1 | 2;
};

export const BLOG_POSTS_MOCK_RESPONSE: BlogPostApiResponse[] = [];

export type BlogPostListItemViewModel = Pick<
  PostListItemProps,
  'title' | 'description' | 'nickname' | 'date' | 'commentCount' | 'descriptionLines' | 'showThumbnail'
> & {
  id: string | number;
};

export function mapBlogPostsToListItems(posts: BlogPostApiResponse[]): BlogPostListItemViewModel[] {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.content,
    nickname: post.authorNickname,
    date: post.createdAt,
    commentCount: post.commentsCount,
    descriptionLines: post.previewLines ?? 2,
    showThumbnail: post.hasThumbnail,
  }));
}
