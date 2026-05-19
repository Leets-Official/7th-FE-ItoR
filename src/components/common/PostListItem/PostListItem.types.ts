export interface PostListItemProps {
  title: string;
  description: string;
  nickname: string;
  date: string;
  commentCount: number;
  onClick?: () => void;
  showThumbnail?: boolean;
  thumbnailSrc?: string;
  descriptionLines?: 1 | 2;
}
