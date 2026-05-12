export interface CommentSectionProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSubmit: (comment: string) => void;
  postAuthorProfile: string;
  postAuthorName: string;
  postId: string;
}
