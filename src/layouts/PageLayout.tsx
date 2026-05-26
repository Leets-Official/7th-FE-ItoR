import { useState } from "react";
import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Modal from "@/components/Modal/Modal";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";

export type HeaderVariant = "plain" | "write" | "edit" | "saveCancel" | "action" | "chatMenu";

interface PageLayoutProps {
  children: ReactNode;
  headerVariant: HeaderVariant;
  onWriteClick?: () => void;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
  onPublishClick?: () => void;
  onChatClick?: () => void;
  onMoreClick?: () => void;
  showMoreIcon?: boolean;
  headerTitle?: string;
  onLoginClick?: () => void;
}

export default function PageLayout({
  children,
  headerVariant,
  onWriteClick,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onDeleteClick,
  onPublishClick,
  onChatClick,
  onMoreClick,
  showMoreIcon,
  headerTitle = "GITLOG",
  onLoginClick,
}: PageLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUserStore();
  const { isLogoutModalOpen, handleLogoutClick, handleConfirmLogout, handleCloseLogoutModal } =
    useLogout();

  const isLogin = !!user;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <header className="fixed top-0 left-0 z-50 w-full">
        <Header
          title={headerTitle}
          variant={headerVariant}
          onMenuClick={() => setIsSidebarOpen(true)}
          onWriteClick={onWriteClick}
          onEditClick={onEditClick}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
          onDeleteClick={onDeleteClick}
          onPublishClick={onPublishClick}
          onChatClick={onChatClick}
          onMoreClick={onMoreClick}
          showMoreIcon={showMoreIcon}
        />
      </header>

      <main className="w-full pt-[70px]">{children}</main>

      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <Sidebar
          variant={isLogin ? "user" : "guest"}
          onLogoutClick={handleLogoutClick}
          onLoginClick={() => {
            onLoginClick?.();
            setIsSidebarOpen(false);
          }}
        />
      </aside>

      <Modal
        open={isLogoutModalOpen}
        title="로그아웃을 진행할까요?"
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="로그아웃"
        cancelText="취소"
        confirmColor="bg-brand-blue text-white hover:opacity-90"
      />
    </div>
  );
}
