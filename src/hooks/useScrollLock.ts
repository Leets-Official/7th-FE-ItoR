import { useEffect } from "react";

export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = locked ? "hidden" : originalStyle;

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [locked]);
};
