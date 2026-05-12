import { useToast } from "@/contexts/ToastContext";

export function useApiError() {
  const { showToast } = useToast();

  const handleError = (error: unknown, context: string) => {
    console.error(`[${context}]`, error);

    if (error instanceof Error) {
      showToast(error.message, "error");
    } else if (typeof error === "string") {
      showToast(error, "error");
    } else {
      showToast(`${context} 중 오류가 발생했습니다.`, "error");
    }
  };

  return { handleError };
}
