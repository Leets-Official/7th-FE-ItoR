import type { ChangeEvent, RefObject } from 'react';

import { AddPhotoAlternateIcon } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import { Profile } from '@/components/common/Profile';
import { TextFieldSet } from '@/components/common/TextFieldSet';
import type { JoinFormErrors, JoinFormValues } from '@/pages/MyPageEditPage/types';

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
    <section className="w-full bg-white">
      <div className="border-b border-gray-90 bg-white">
        <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[10px] px-4 pt-6 pb-3 md:max-w-[688px]">

          <div className="relative h-[88px]">
            {profileImage ? (
              <img
                src={profileImage}
                alt="선택한 프로필"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <Profile size={1} className="h-16 w-16" />
            )}
            <button
              type="button"
              aria-label="프로필 사진 추가"
              className="absolute left-[52px] top-[42px] flex h-6 w-6 items-center justify-center rounded-full border border-gray-56 bg-gray-20 text-white"
              onClick={openFileDialog}
            >
              <AddPhotoAlternateIcon className="h-[14px] w-[14px] [&_*]:fill-current [&_*]:stroke-current" />
            </button>
          </div>

          <TextFieldSet
            label="닉네임"
            placeholder="닉네임"
            size={32}
            state={values.nickname ? 'input' : 'default'}
            value={values.nickname}
            onChange={(event) => handleChange('nickname', event.target.value)}
            showHelperText
            helperTone={errors.nickname ? 'error' : 'default'}
            helperText={errors.nickname ?? '* 20글자 이내'}
            className="px-0 py-0"
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
            className="px-0 py-0"
          />

          <div className="h-[12px]" aria-hidden="true" />

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
      </div>

      <div className="border-b border-gray-90 bg-white">
        <div className="mx-auto w-full max-w-[390px] px-4 py-3 md:max-w-[688px]">
          <TextFieldSet
            label="이메일"
            placeholder="이메일"
            size={14}
            state="disabled"
            value={values.email}
            disabled
            className="px-0 py-0"
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
            className="px-0 py-0"
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
            className="px-0 py-0"
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
            className="px-0 py-0"
          />
          <TextFieldSet
            label="생년월일"
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            placeholder="YYYY - MM - DD"
            size={14}
            state={values.birthDate ? 'input' : 'default'}
            value={values.birthDate}
            onChange={(event) => handleBirthDateChange(event.target.value)}
            onBlur={handleBirthDateBlur}
            showHelperText={Boolean(errors.birthDate)}
            helperTone="error"
            helperText={errors.birthDate}
            className="px-0 py-0"
          />

          {submitError ? <p className="px-[6px] text-xs font-light leading-[160%] tracking-[0] text-warning">{submitError}</p> : null}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[390px] px-4 py-3 md:hidden">
        <Button
          size="regular"
          intent="primary"
          showIcon={false}
          className="h-[38px] w-full rounded-[25px]"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </div>
    </section>
  );
}
