import type { ReactNode } from 'react';

import { TextFieldSet } from '@/components/common/TextFieldSet';
import type { JoinFormErrors, JoinFormValues } from './types';

type FormVariant = 'email' | 'kakao' | 'member';

interface AccountFieldsSectionProps {
  values: JoinFormValues;
  errors: JoinFormErrors;
  variant?: FormVariant;
  submitError: string;
  canSubmit: boolean;
  handleChange: (key: keyof JoinFormValues, value: string) => void;
  handleBirthDateChange: (rawValue: string) => void;
  handleBirthDateBlur: () => void;
  handleSubmit: () => void;
}

interface FieldFrameProps {
  children: ReactNode;
}

function FieldFrame({ children }: FieldFrameProps) {
  return (
    <div className="mx-auto flex min-h-[104px] w-full max-w-[688px] items-start px-4 py-3">
      {children}
    </div>
  );
}

export function AccountFieldsSection({ values, errors, variant = 'email', submitError, canSubmit, handleChange, handleBirthDateChange, handleBirthDateBlur, handleSubmit }: AccountFieldsSectionProps) {
  const isEmailSignup = variant === 'email';
  const isMemberEdit = variant === 'member';
  const showPasswordFields = variant !== 'kakao';
  const submitLabel = isMemberEdit ? '저장하기' : '회원가입 완료';

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[688px]">
        <FieldFrame>
          <TextFieldSet label="이메일" placeholder="이메일" size={14} state={isEmailSignup && !values.email ? 'default' : values.email ? 'input' : 'disabled'} value={values.email} disabled={!isEmailSignup} onChange={(event) => handleChange('email', event.target.value)} showHelperText={Boolean(errors.email)} helperTone="error" helperText={errors.email} className="max-w-[656px] px-0 py-0" />
        </FieldFrame>
        {showPasswordFields ? (
          <>
            <FieldFrame>
              <TextFieldSet label="비밀번호" type="password" placeholder="......" size={14} state={values.password ? 'input' : 'default'} value={values.password} onChange={(event) => handleChange('password', event.target.value)} showHelperText={Boolean(errors.password)} helperTone="error" helperText={errors.password} className="max-w-[656px] px-0 py-0" />
            </FieldFrame>
            <FieldFrame>
              <TextFieldSet label="비밀번호 확인" type="password" placeholder="......" size={14} state={values.passwordConfirm ? 'input' : 'default'} value={values.passwordConfirm} onChange={(event) => handleChange('passwordConfirm', event.target.value)} showHelperText={Boolean(errors.passwordConfirm)} helperTone="error" helperText={errors.passwordConfirm} className="max-w-[656px] px-0 py-0" />
            </FieldFrame>
          </>
        ) : null}
        <FieldFrame>
          <TextFieldSet label="이름" placeholder="이름" size={14} state={values.name ? 'input' : 'default'} value={values.name} onChange={(event) => handleChange('name', event.target.value)} showHelperText={Boolean(errors.name)} helperTone="error" helperText={errors.name} className="max-w-[656px] px-0 py-0" />
        </FieldFrame>
        <FieldFrame>
          <TextFieldSet label="생년월일" type="text" inputMode="numeric" autoComplete="bday" placeholder="YYYY - MM - DD" size={14} state={values.birthDate ? 'input' : 'default'} value={values.birthDate} onChange={(event) => handleBirthDateChange(event.target.value)} onBlur={handleBirthDateBlur} showHelperText={Boolean(errors.birthDate)} helperTone="error" helperText={errors.birthDate} className="max-w-[656px] px-0 py-0" />
        </FieldFrame>
        <FieldFrame>
          <TextFieldSet label="닉네임" placeholder="닉네임" size={14} state={values.nickname ? 'input' : 'default'} value={values.nickname} onChange={(event) => handleChange('nickname', event.target.value)} showHelperText helperTone={errors.nickname ? 'error' : 'default'} helperText={errors.nickname ?? '* 20글자 이내'} className="max-w-[656px] px-0 py-0" />
        </FieldFrame>
        <FieldFrame>
          <TextFieldSet label="한 줄 소개" placeholder="한 줄 소개" size={14} state={values.introduction ? 'input' : 'default'} value={values.introduction} onChange={(event) => handleChange('introduction', event.target.value)} showHelperText={Boolean(errors.introduction)} helperTone="error" helperText={errors.introduction} className="max-w-[656px] px-0 py-0" />
        </FieldFrame>
        <div className="h-8" aria-hidden="true" />
        {submitError ? <p className="px-4 pb-3 text-xs font-light text-warning">{submitError}</p> : null}
        <div className="mx-auto flex h-[38px] w-full max-w-[688px] px-4">
          <button
            type="button"
            className="h-[38px] w-full max-w-[656px] rounded-[25px] border border-primary bg-white text-sm font-light leading-[160%] tracking-[-0.07px] text-primary disabled:cursor-not-allowed disabled:border-gray-90 disabled:text-gray-56"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {submitLabel}
          </button>
        </div>
        <div className="h-20" aria-hidden="true" />
      </div>
    </div>
  );
}
