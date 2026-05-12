import { useToast } from "@/contexts/ToastContext";

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function useImageValidation() {
  const { showToast } = useToast();

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

  const validateImage = (file: File): ValidationResult => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: "JPG, PNG, GIF, WebP 형식의 이미지만 업로드 가능합니다.",
      };
    }

    if (file.size > MAX_SIZE) {
      return {
        isValid: false,
        error: "파일 크기는 5MB 이하만 가능합니다.",
      };
    }

    return { isValid: true };
  };

  const validateAndShowError = (file: File): boolean => {
    const result = validateImage(file);
    if (!result.isValid && result.error) {
      showToast(result.error, "error");
    }
    return result.isValid;
  };

  return { validateImage, validateAndShowError };
}
