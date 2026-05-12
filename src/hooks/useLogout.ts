import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

export function useLogout() {
  const navigate = useNavigate();

  const clearTokens = useAuthStore((state) => state.clearTokens);
  const clearUser = useUserStore((state) => state.clearUser);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    clearTokens();
    clearUser();

    localStorage.removeItem("user-storage");

    setIsLogoutModalOpen(false);

    navigate("/blog", { replace: true });
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return {
    isLogoutModalOpen,
    handleLogoutClick,
    handleConfirmLogout,
    handleCloseLogoutModal,
  };
}
