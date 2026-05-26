import { TextFieldSet } from '@/components/common/TextFieldSet';
import type { JoinFormErrors, JoinFormValues } from './types';

interface AccountFieldsSectionProps {
  values: JoinFormValues;
  errors: JoinFormErrors;
  submitError: string;
  handleChange: (key: keyof JoinFormValues, value: string) => void;
  handleBirthDateChange: (rawValue: string) => void;
  handleBirthDateBlur: () => void;
}

export function AccountFieldsSection({ values, errors, submitError, handleChange, handleBirthDateChange, handleBirthDateBlur }: AccountFieldsSectionProps) {
  return (
    <div className="border-b border-gray-90 bg-white">
      <div className="mx-auto w-full max-w-[390px] px-4 py-3 md:max-w-[688px]">
        <TextFieldSet label="이메일" placeholder="이메일" size={14} state="disabled" value={values.email} disabled className="px-0 py-0" />
        <TextFieldSet label="비밀번호" type="password" placeholder="......" size={14} state={values.password ? 'input' : 'default'} value={values.password} onChange={(event) => handleChange('password', event.target.value)} showHelperText={Boolean(errors.password)} helperTone="error" helperText={errors.password} className="px-0 py-0" />
        <TextFieldSet label="비밀번호 확인" type="password" placeholder="......" size={14} state={values.passwordConfirm ? 'input' : 'default'} value={values.passwordConfirm} onChange={(event) => handleChange('passwordConfirm', event.target.value)} showHelperText={Boolean(errors.passwordConfirm)} helperTone="error" helperText={errors.passwordConfirm} className="px-0 py-0" />
        <TextFieldSet label="이름" placeholder="이름" size={14} state={values.name ? 'input' : 'default'} value={values.name} onChange={(event) => handleChange('name', event.target.value)} showHelperText={Boolean(errors.name)} helperTone="error" helperText={errors.name} className="px-0 py-0" />
        <TextFieldSet label="생년월일" type="text" inputMode="numeric" autoComplete="bday" placeholder="YYYY - MM - DD" size={14} state={values.birthDate ? 'input' : 'default'} value={values.birthDate} onChange={(event) => handleBirthDateChange(event.target.value)} onBlur={handleBirthDateBlur} showHelperText={Boolean(errors.birthDate)} helperTone="error" helperText={errors.birthDate} className="px-0 py-0" />
        {submitError ? <p className="px-[6px] text-xs font-light text-warning">{submitError}</p> : null}
      </div>
    </div>
  );
}
