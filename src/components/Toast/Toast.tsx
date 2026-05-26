import { useEffect } from "react";
import type { ToastProps } from "./Toast.types";
import { base, variants } from "./Toast.styled";
import { cn } from "@/utils/cn";
import { ErrorOutlineIcon, DoneIcon } from "@/assets/icons";

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={cn(base, variants[type])}>
      {type === "success" ? (
        <DoneIcon className="h-6 w-6" />
      ) : (
        <ErrorOutlineIcon className="h-6 w-6" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
