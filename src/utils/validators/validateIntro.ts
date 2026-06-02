import { ERROR_MESSAGES } from "../errorMessages";

export const validateIntro = (intro: string) => {
  if (!intro) return ERROR_MESSAGES.REQUIRED;
  if (intro.length > 30) return ERROR_MESSAGES.INTRO_LENGTH;
  return "";
};
