import { ERROR_MESSAGES } from "../errorMessages";

export const validatePasswordConfirm = (pw: string, pwConfirm: string) => {
  if (!pwConfirm) return ERROR_MESSAGES.REQUIRED;
  if (pw !== pwConfirm) return ERROR_MESSAGES.PASSWORD_MISMATCH;
  return "";
};
