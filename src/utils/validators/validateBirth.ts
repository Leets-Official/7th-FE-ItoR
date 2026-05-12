import { ERROR_MESSAGES } from "../errorMessages";

export const validateBirth = (birth: string) => {
  if (!birth) return ERROR_MESSAGES.REQUIRED;

  const today = new Date();
  const birthDate = new Date(birth);

  if (isNaN(birthDate.getTime())) {
    return ERROR_MESSAGES.BIRTH_INVALID;
  }
  if (birthDate >= today) {
    return ERROR_MESSAGES.BIRTH_FUTURE;
  }

  return "";
};
