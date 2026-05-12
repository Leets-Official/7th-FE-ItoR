import { ERROR_MESSAGES } from "../errorMessages";

export const validateNickname = (nickname: string) => {
  if (!nickname) return ERROR_MESSAGES.REQUIRED;
  if (nickname.length > 20) return ERROR_MESSAGES.NICKNAME_LENGTH;
  return "";
};
