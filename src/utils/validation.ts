import { REQUIRED_MESSAGE, type JoinFormErrors, type JoinFormValues } from '@/pages/MyPageEditPage/types';

const USED_EMAILS = ['admin@gitlog.com', 'test@example.com', 'user@domain.com'];

export function validateJoinForm(formValues: JoinFormValues): JoinFormErrors {
  const nextErrors: JoinFormErrors = {};
  const email = formValues.email.trim().toLowerCase();

  if (!email) {
    nextErrors.email = REQUIRED_MESSAGE;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = '* 올바른 이메일 형식이 아닙니다.';
  } else if (USED_EMAILS.includes(email)) {
    nextErrors.email = '* 사용중인 이메일입니다.';
  }

  if (!formValues.password.trim()) {
    nextErrors.password = REQUIRED_MESSAGE;
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/.test(formValues.password)) {
    nextErrors.password = '* 영문/숫자/특수문자를 포함해 8자 이상 입력해주세요.';
  }

  if (!formValues.passwordConfirm.trim()) {
    nextErrors.passwordConfirm = REQUIRED_MESSAGE;
  } else if (formValues.password !== formValues.passwordConfirm) {
    nextErrors.passwordConfirm = '* 비밀번호가 일치하지 않습니다.';
  }

  if (!formValues.name.trim()) {
    nextErrors.name = REQUIRED_MESSAGE;
  } else if (formValues.name.trim().length > 10) {
    nextErrors.name = '* 이름은 최대 10글자 입니다.';
  }

  if (!formValues.birthDate.trim()) {
    nextErrors.birthDate = REQUIRED_MESSAGE;
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.birthDate.trim())) {
    nextErrors.birthDate = '* YYYY-MM-DD 형식으로 입력해주세요.';
  } else {
    const [year, month, day] = formValues.birthDate.trim().split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(birthDate.getTime()) ||
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getDate() !== day
    ) {
      nextErrors.birthDate = '* 올바른 날짜 형식이 아닙니다.';
    } else if (birthDate > today) {
      nextErrors.birthDate = '* 오늘 이전의 날짜만 가능합니다.';
    }
  }

  if (!formValues.nickname.trim()) {
    nextErrors.nickname = REQUIRED_MESSAGE;
  } else if (formValues.nickname.trim().length > 20) {
    nextErrors.nickname = '* 닉네임은 최대 20글자입니다.';
  }

  if (formValues.introduction.trim().length > 30) {
    nextErrors.introduction = '* 한 줄 소개는 최대 30글자입니다.';
  }

  return nextErrors;
}

export function validateProfileUpdateForm(formValues: JoinFormValues): JoinFormErrors {
  const nextErrors: JoinFormErrors = {};
  const email = formValues.email.trim().toLowerCase();

  if (!email) {
    nextErrors.email = REQUIRED_MESSAGE;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = '* 올바른 이메일 형식이 아닙니다.';
  }

  if (formValues.password.trim() || formValues.passwordConfirm.trim()) {
    if (!formValues.password.trim()) {
      nextErrors.password = REQUIRED_MESSAGE;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/.test(formValues.password)) {
      nextErrors.password = '* 영문/숫자/특수문자를 포함해 8자 이상 입력해주세요.';
    }

    if (!formValues.passwordConfirm.trim()) {
      nextErrors.passwordConfirm = REQUIRED_MESSAGE;
    } else if (formValues.password !== formValues.passwordConfirm) {
      nextErrors.passwordConfirm = '* 비밀번호가 일치하지 않습니다.';
    }
  }

  if (!formValues.name.trim()) {
    nextErrors.name = REQUIRED_MESSAGE;
  } else if (formValues.name.trim().length > 10) {
    nextErrors.name = '* 이름은 최대 10글자 입니다.';
  }

  if (!formValues.birthDate.trim()) {
    nextErrors.birthDate = REQUIRED_MESSAGE;
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.birthDate.trim())) {
    nextErrors.birthDate = '* YYYY-MM-DD 형식으로 입력해주세요.';
  }

  if (!formValues.nickname.trim()) {
    nextErrors.nickname = REQUIRED_MESSAGE;
  } else if (formValues.nickname.trim().length > 20) {
    nextErrors.nickname = '* 닉네임은 최대 20글자입니다.';
  }

  if (formValues.introduction.trim().length > 30) {
    nextErrors.introduction = '* 한 줄 소개는 최대 30글자입니다.';
  }

  return nextErrors;
}
