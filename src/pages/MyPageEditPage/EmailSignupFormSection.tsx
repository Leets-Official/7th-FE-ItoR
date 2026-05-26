import type { ChangeEvent, RefObject } from 'react';
import { Button } from '@/components/common/Button';
import type { JoinFormErrors, JoinFormValues } from '@/pages/MyPageEditPage/types';
import { AccountFieldsSection } from './AccountFieldsSection';
import { ProfileFieldsSection } from './ProfileFieldsSection';

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

export function EmailSignupFormSection(props: EmailSignupFormSectionProps) {
  return (
    <section className="w-full bg-white">
      <ProfileFieldsSection
        values={props.values}
        errors={props.errors}
        profileImage={props.profileImage}
        profileImageError={props.profileImageError}
        fileInputRef={props.fileInputRef}
        openFileDialog={props.openFileDialog}
        handleProfileFileChange={props.handleProfileFileChange}
        handleChange={props.handleChange}
      />
      <AccountFieldsSection
        values={props.values}
        errors={props.errors}
        submitError={props.submitError}
        handleChange={props.handleChange}
        handleBirthDateChange={props.handleBirthDateChange}
        handleBirthDateBlur={props.handleBirthDateBlur}
      />
      <div className="mx-auto w-full max-w-[390px] px-4 py-3 md:hidden">
        <Button size="regular" intent="primary" showIcon={false} className="h-[38px] w-full rounded-[25px]" disabled={!props.canSubmit} onClick={props.handleSubmit}>
          저장하기
        </Button>
      </div>
    </section>
  );
}
