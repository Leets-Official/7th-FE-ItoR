export interface CommentItemProps {
  author: string;
  date: string;
  content: string;
  profileUrl: string;
  isOwner?: boolean;
  isLoggedIn?: boolean;
  onDelete?: () => void;
  onEdit?: (newContent: string) => void;
}
