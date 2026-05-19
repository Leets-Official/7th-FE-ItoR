import { LOGIN_ERROR_MESSAGES } from "../errorMessages";

export const validateLoginEmail = (email: string): string | null => {
  if (!email) return "이메일을 입력해주세요.";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return LOGIN_ERROR_MESSAGES.invalidEmailFormat;
  }

  return null;
};
