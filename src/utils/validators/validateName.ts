import { ERROR_MESSAGES } from "../errorMessages";

export const validateName = (name: string) => {
  if (!name) return ERROR_MESSAGES.REQUIRED;
  if (name.length > 10) return ERROR_MESSAGES.NAME_LENGTH;
  return "";
};
