import { ERROR_MESSAGES } from "../errorMessages";

export const validateEmail = (email: string) => {
  if (!email) return ERROR_MESSAGES.REQUIRED;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ERROR_MESSAGES.EMAIL_FORMAT;
  if (email === "test@example.com") return ERROR_MESSAGES.EMAIL_DUPLICATE;
  return "";
};
