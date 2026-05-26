import type { ChangeEvent, RefObject } from 'react';
import { AddPhotoAlternateIcon } from '@/assets/icons';
import { Profile } from '@/components/common/Profile';
import { TextFieldSet } from '@/components/common/TextFieldSet';
import type { JoinFormErrors, JoinFormValues } from './types';

interface ProfileFieldsSectionProps {
  values: JoinFormValues;
  errors: JoinFormErrors;
  profileImage: string | null;
  profileImageError: string;
  fileInputRef: RefObject<HTMLInputElement>;
  openFileDialog: () => void;
  handleProfileFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (key: keyof JoinFormValues, value: string) => void;
}

export function ProfileFieldsSection({ values, errors, profileImage, profileImageError, fileInputRef, openFileDialog, handleProfileFileChange, handleChange }: ProfileFieldsSectionProps) {
  return (
    <div className="border-b border-gray-90 bg-white">
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[10px] px-4 pt-6 pb-3 md:max-w-[688px]">
        <div className="relative h-[88px]">
          {profileImage ? <img src={profileImage} alt="선택한 프로필" className="h-16 w-16 rounded-full object-cover" /> : <Profile size={1} className="h-16 w-16" />}
          <button type="button" aria-label="프로필 사진 추가" className="absolute left-[52px] top-[42px] flex h-6 w-6 items-center justify-center rounded-full border border-gray-56 bg-gray-20 text-white" onClick={openFileDialog}>
            <AddPhotoAlternateIcon className="h-[14px] w-[14px] [&_*]:fill-current [&_*]:stroke-current" />
          </button>
        </div>

        <TextFieldSet label="닉네임" placeholder="닉네임" size={32} state={values.nickname ? 'input' : 'default'} value={values.nickname} onChange={(event) => handleChange('nickname', event.target.value)} showHelperText helperTone={errors.nickname ? 'error' : 'default'} helperText={errors.nickname ?? '* 20글자 이내'} className="px-0 py-0" />
        <TextFieldSet label="한 줄 소개" placeholder="한 줄 소개" size={14} state={values.introduction ? 'input' : 'default'} value={values.introduction} onChange={(event) => handleChange('introduction', event.target.value)} showHelperText={Boolean(errors.introduction)} helperTone="error" helperText={errors.introduction} className="px-0 py-0" />
        <div className="h-[12px]" aria-hidden="true" />
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileFileChange} />
        {profileImageError ? <p className="px-[6px] text-xs font-light text-warning">{profileImageError}</p> : null}
      </div>
    </div>
  );
}
