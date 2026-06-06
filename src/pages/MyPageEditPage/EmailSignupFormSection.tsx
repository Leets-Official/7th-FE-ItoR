import type { ChangeEvent, RefObject } from 'react';
import { KakaoIcon } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import type { JoinFormErrors, JoinFormValues } from '@/pages/MyPageEditPage/types';
import { AccountFieldsSection } from './AccountFieldsSection';
import { ProfileFieldsSection } from './ProfileFieldsSection';

type FormVariant = 'email' | 'kakao' | 'member';

interface EmailSignupFormSectionProps {
  values: JoinFormValues;
  errors: JoinFormErrors;
  canSubmit: boolean;
  variant?: FormVariant;
  profileImage: string | null;
  profileImageError: string;
  fileInputRef: RefObject<HTMLInputElement>;
  openFileDialog: () => void;
  handleProfileFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (key: keyof JoinFormValues, value: string) => void;
  handleBirthDateChange: (rawValue: string) => void;
  handleBirthDateBlur: () => void;
  handleKakaoSignup?: () => void;
  submitError: string;
  handleSubmit: () => void;
}

export function EmailSignupFormSection(props: EmailSignupFormSectionProps) {
  const isKakaoSignup = props.variant === 'kakao';

  return (
    <section className="w-full bg-white">
      <ProfileFieldsSection
        variant={props.variant}
        values={props.values}
        errors={props.errors}
        profileImage={props.profileImage}
        profileImageError={props.profileImageError}
        fileInputRef={props.fileInputRef}
        openFileDialog={props.openFileDialog}
        handleProfileFileChange={props.handleProfileFileChange}
        handleChange={props.handleChange}
      />
      {isKakaoSignup ? (
        <div className="border-b border-gray-90 bg-white">
          <div className="mx-auto w-full max-w-[390px] px-4 py-3 md:max-w-[688px]">
            <p className="px-[6px] pb-3 text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-56">소셜 로그인</p>
            <Button
              size="regular"
              showIcon
              icon={<KakaoIcon aria-hidden="true" />}
              className="h-[45px] w-full rounded-[2px] border-transparent bg-gray-90 text-gray-56 [&_svg]:h-[17px] [&_svg]:w-[18px]"
              onClick={props.handleKakaoSignup}
            >
              카카오 로그인
            </Button>
          </div>
        </div>
      ) : null}
      <AccountFieldsSection
        variant={props.variant}
        values={props.values}
        errors={props.errors}
        canSubmit={props.canSubmit}
        submitError={props.submitError}
        handleChange={props.handleChange}
        handleBirthDateChange={props.handleBirthDateChange}
        handleBirthDateBlur={props.handleBirthDateBlur}
        handleSubmit={props.handleSubmit}
      />
    </section>
  );
}
