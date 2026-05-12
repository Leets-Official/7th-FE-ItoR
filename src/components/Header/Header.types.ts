export type HeaderVariant = "write" | "chatMenu" | "action" | "plain" | "edit" | "saveCancel";

export interface HeaderProps {
  title?: string;
  variant?: HeaderVariant;
  onWriteClick?: () => void;
  onChatClick?: () => void;
  onMenuClick?: () => void;
  onMoreClick?: () => void;
  onDeleteClick?: () => void;
  onPublishClick?: () => void;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  showMoreIcon?: boolean;
}
