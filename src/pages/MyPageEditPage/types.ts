export interface JoinFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  nickname: string;
  introduction: string;
}

export type JoinFormErrors = Partial<Record<keyof JoinFormValues, string>>;

export const REQUIRED_MESSAGE = '* 반드시 입력해야하는 필수 사항입니다.';

export const initialFormValues: JoinFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  birthDate: '',
  nickname: '',
  introduction: '',
};
