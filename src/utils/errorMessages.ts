export const ERROR_MESSAGES = {
  REQUIRED: "반드시 입력해야하는 필수 사항입니다",
  EMAIL_FORMAT: "이메일 형식이 적합하지 않습니다",
  EMAIL_DUPLICATE: "사용중인 이메일입니다",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다",
  NAME_LENGTH: "이름은 최대 10글자 입니다",
  NICKNAME_LENGTH: "닉네임은 최대 20글자 입니다",
  INTRO_LENGTH: "한 줄 소개는 최대 30글자 입니다",
  BIRTH_INVALID: "날짜 형식이 올바르지 않습니다 (YYYY-MM-DD)",
  BIRTH_FUTURE: "2025년 10월 18일 이전의 수만 가능합니다",
} as const;

export const LOGIN_ERROR_MESSAGES = {
  emailNotRegistered: "가입되지 않은 이메일입니다.",
  invalidEmailFormat: "이메일 형식이 적합하지 않습니다.",
  wrongPassword: "비밀번호가 일치하지 않습니다.",
};
