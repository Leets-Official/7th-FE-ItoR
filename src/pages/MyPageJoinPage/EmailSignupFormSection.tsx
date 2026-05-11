import type { ChangeEvent, RefObject } from 'react';

import { AddPhotoAlternateIcon } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import { Profile } from '@/components/common/Profile';
import { TextFieldSet } from '@/components/common/TextFieldSet';
import type { JoinFormErrors, JoinFormValues } from '@/pages/MyPageJoinPage/types';

interface EmailSignupFormSectionProps {
  values: JoinFormValues;
  errors: JoinFormErrors;
  canSubmit: boolean;
  profileImage: string | null;
  profileImageError: string;
  fileInputRef: RefObject<HTMLInputElement>;
  openFileDialog: () => void;
  handleProfileFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (key: keyof JoinFormValues, value: string) => void;
  handleBirthDateChange: (rawValue: string) => void;
  handleBirthDateBlur: () => void;
  submitError: string;
  handleSubmit: () => void;
}

export function EmailSignupFormSection({
  values,
  errors,
  canSubmit,
  profileImage,
  profileImageError,
  fileInputRef,
  openFileDialog,
  handleProfileFileChange,
  handleChange,
  handleBirthDateChange,
  handleBirthDateBlur,
  submitError,
  handleSubmit,
}: EmailSignupFormSectionProps) {
  return (
    <section className="mx-auto w-full max-w-[688px] bg-white pb-3 pt-5 md:pt-5">
      <div className="flex flex-col gap-4 px-4 py-3">
        <p className="px-[6px] text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-56">프로필 사진</p>

        {profileImage ? (
          <img
            src={profileImage}
            alt="선택한 프로필"
            className="h-[90px] w-[90px] rounded-full object-cover"
          />
        ) : (
          <Profile size={1} className="h-[90px] w-[90px]" />
        )}

        <Button
          size="text"
          intent="gray"
          showIcon
          icon={<AddPhotoAlternateIcon aria-hidden="true" />}
          className="w-fit border-gray-90 bg-white px-2 py-[2px]"
          onClick={openFileDialog}
        >
          프로필 사진 추가
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileFileChange}
        />
        {profileImageError ? (
          <p className="px-[6px] text-xs font-light leading-[160%] tracking-[0] text-warning">{profileImageError}</p>
        ) : null}
      </div>

      <TextFieldSet
        label="이메일"
        placeholder="이메일"
        size={14}
        state={values.email ? 'input' : 'default'}
        value={values.email}
        onChange={(event) => handleChange('email', event.target.value)}
        showHelperText={Boolean(errors.email)}
        helperTone="error"
        helperText={errors.email}
        className="mt-3"
      />
      <TextFieldSet
        label="비밀번호"
        type="password"
        placeholder="......"
        size={14}
        state={values.password ? 'input' : 'default'}
        value={values.password}
        onChange={(event) => handleChange('password', event.target.value)}
        showHelperText={Boolean(errors.password)}
        helperTone="error"
        helperText={errors.password}
        className="mt-1"
      />
      <TextFieldSet
        label="비밀번호 확인"
        type="password"
        placeholder="......"
        size={14}
        state={values.passwordConfirm ? 'input' : 'default'}
        value={values.passwordConfirm}
        onChange={(event) => handleChange('passwordConfirm', event.target.value)}
        showHelperText={Boolean(errors.passwordConfirm)}
        helperTone="error"
        helperText={errors.passwordConfirm}
        className="mt-1"
      />
      <TextFieldSet
        label="이름"
        placeholder="이름"
        size={14}
        state={values.name ? 'input' : 'default'}
        value={values.name}
        onChange={(event) => handleChange('name', event.target.value)}
        showHelperText={Boolean(errors.name)}
        helperTone="error"
        helperText={errors.name}
        className="mt-1"
      />
      <TextFieldSet
        label="생년월일"
        type="text"
        inputMode="numeric"
        autoComplete="bday"
        placeholder="YYYY-MM-DD"
        size={14}
        state={values.birthDate ? 'input' : 'default'}
        value={values.birthDate}
        onChange={(event) => handleBirthDateChange(event.target.value)}
        onBlur={handleBirthDateBlur}
        showHelperText={Boolean(errors.birthDate)}
        helperTone="error"
        helperText={errors.birthDate}
        className="mt-1"
      />
      <TextFieldSet
        label="닉네임"
        placeholder="닉네임"
        size={14}
        state={values.nickname ? 'input' : 'default'}
        value={values.nickname}
        onChange={(event) => handleChange('nickname', event.target.value)}
        showHelperText={Boolean(errors.nickname) || !errors.nickname}
        helperTone={errors.nickname ? 'error' : 'default'}
        helperText={errors.nickname ?? '* 20글자 이내'}
        className="mt-1"
      />
      <TextFieldSet
        label="한 줄 소개"
        placeholder="한 줄 소개"
        size={14}
        state={values.introduction ? 'input' : 'default'}
        value={values.introduction}
        onChange={(event) => handleChange('introduction', event.target.value)}
        showHelperText={Boolean(errors.introduction)}
        helperTone="error"
        helperText={errors.introduction}
        className="mt-1"
      />

      <div className="px-4 py-3">
        {submitError ? (
          <p className="mb-2 px-[6px] text-xs font-light leading-[160%] tracking-[0] text-warning">{submitError}</p>
        ) : null}
        <Button
          size="regular"
          intent="primary"
          showIcon={false}
          className="h-[38px] w-full rounded-[25px]"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          회원가입 완료
        </Button>
      </div>
    </section>
  );
}
