export type SidebarVariant = "guest" | "user";

export interface SidebarProps {
  variant: SidebarVariant;
  nickname?: string;
  intro?: string;
  profileSrc?: string;
  onMyPageClick?: () => void;
  onSettingClick?: () => void;
  onLogoutClick?: () => void;
  onLoginClick?: () => void;
}
