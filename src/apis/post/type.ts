export type GetPostListParams = {
  page: number;
  size: number;
};

export type PostContentType = 'TEXT' | 'IMAGE';

export type PostContent = {
  contentOrder: number;
  content: string;
  contentType: PostContentType;
};

export type PostSummary = {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
  contents: PostContent[];
};

export type PostListResponse = {
  posts: PostSummary[];
  pageMax: number;
};
