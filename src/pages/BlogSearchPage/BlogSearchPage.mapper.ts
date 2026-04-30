import type { PostListItemProps } from '@/components/common/PostListItem/PostListItem.types';

type BlogPostApiResponse = {
  id: number;
  title: string;
  content: string;
  authorNickname: string;
  createdAt: string;
  commentsCount: number;
  hasThumbnail?: boolean;
  previewLines?: 1 | 2;
};

export const BLOG_POSTS_MOCK_RESPONSE: BlogPostApiResponse[] = [
  {
    id: 1,
    title: '16 Title one line',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a...",
    authorNickname: '닉네임',
    createdAt: 'Fed 17. 2025.',
    commentsCount: 0,
    previewLines: 2,
    hasThumbnail: true,
  },
  {
    id: 2,
    title: '16 Title one line',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    authorNickname: '닉네임',
    createdAt: 'Fed 17. 2025.',
    commentsCount: 0,
    previewLines: 1,
    hasThumbnail: true,
  },
  {
    id: 3,
    title: '16 Title one line',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type an...",
    authorNickname: '닉네임',
    createdAt: 'Fed 17. 2025.',
    commentsCount: 0,
    previewLines: 2,
    hasThumbnail: false,
  },
  {
    id: 4,
    title: '16 Title one line',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    authorNickname: '닉네임',
    createdAt: 'Fed 17. 2025.',
    commentsCount: 0,
    previewLines: 1,
    hasThumbnail: false,
  },
];

export type BlogPostListItemViewModel = Pick<
  PostListItemProps,
  'title' | 'description' | 'nickname' | 'date' | 'commentCount' | 'descriptionLines' | 'showThumbnail'
> & {
  id: number;
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
