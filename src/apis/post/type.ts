export type GetPostListParams = {
  page: number;
  size: number;
};

export type GetPostDetailParams = {
  postId: string;
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

export type PostComment = {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
};

export type PostDetailResponse = {
  postId: string;
  title: string;
  contents: PostContent[];
  isOwner: boolean;
  comments: PostComment[];
  nickName: string;
  profileUrl: string;
  introduction: string;
  createdAt: string;
};
