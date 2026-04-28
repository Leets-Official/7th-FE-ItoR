export interface PostListItemProps {
  title: string;
  description: string;
  nickname: string;
  date: string;
  commentCount: number;
  showThumbnail?: boolean;
  thumbnailSrc?: string;
  descriptionLines?: 1 | 2;
}
