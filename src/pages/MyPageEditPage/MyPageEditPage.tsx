import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAuthEntryUrl, getKakaoLoginRedirectUrl } from '@/api/auth';

import { PageHeader } from '@/components/common/PageHeader';
import { type SignupMethod, useEmailSignupFlow } from '@/hooks/useEmailSignupFlow';
import { useProfileImage } from '@/hooks/useProfileImage';
import { EmailSignupFormSection } from '@/pages/MyPageEditPage/EmailSignupFormSection';
import { JoinSuccessModal } from '@/pages/MyPageEditPage/JoinSuccessModal';

interface MyPageEditPageProps {
  signupMethod?: SignupMethod;
}

export function MyPageEditPage({ signupMethod = 'email' }: MyPageEditPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMemberEditMode = searchParams.get('auth') === 'member';
  const formVariant = isMemberEditMode ? 'member' : signupMethod;
  const {
    values,
    errors,
    canSubmit,
    isBootstrapping,
    initialProfilePicture,
    submitError,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    handleChange,
    handleBirthDateChange,
    handleBirthDateBlur,
    handleSubmit,
  } = useEmailSignupFlow(signupMethod);

  const {
    fileInputRef,
    profileImage,
    setProfileImage,
    profileImageError,
    openFileDialog,
    handleProfileFileChange,
  } = useProfileImage();

  useEffect(() => {
    if (initialProfilePicture) {
      setProfileImage(initialProfilePicture);
    }
  }, [initialProfilePicture, setProfileImage]);

  const handleKakaoSignup = async () => {
    try {
      const redirectUrl = await getKakaoLoginRedirectUrl();
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
    } catch {
      // Fall back to the backend OAuth entrypoint below.
    }

    window.location.href = getAuthEntryUrl('/auth/kakao');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        type={isMemberEditMode ? 'write' : 'empty'}
        className="h-[72px] border-b border-gray-90"
        onCancelClick={() => navigate(-1)}
        onSubmitPost={() => handleSubmit(profileImage)}
        cancelLabel="취소하기"
        submitLabel={isMemberEditMode ? '저장하기' : '회원가입 완료'}
        isSubmitDisabled={!canSubmit}
      />

      <main className="w-full bg-white">
        {!isMemberEditMode ? (
          <section className="h-[114px] border-b border-[#F5F5F5] bg-[#F5F5F5]">
            <div className="mx-auto flex h-full w-full max-w-[688px] items-center px-4">
              <h1 className="text-2xl font-medium leading-[160%] text-black">회원가입</h1>
            </div>
          </section>
        ) : null}
        {isBootstrapping ? (
          <div className="px-4 py-8 text-sm text-gray-56">내 정보를 불러오는 중입니다.</div>
        ) : (
          <EmailSignupFormSection
            variant={formVariant}
            values={values}
            errors={errors}
            canSubmit={canSubmit}
            profileImage={profileImage}
            profileImageError={profileImageError}
            fileInputRef={fileInputRef}
            openFileDialog={openFileDialog}
            handleProfileFileChange={handleProfileFileChange}
            handleChange={handleChange}
            handleBirthDateChange={handleBirthDateChange}
            handleBirthDateBlur={handleBirthDateBlur}
            handleKakaoSignup={handleKakaoSignup}
            submitError={submitError}
            handleSubmit={() => handleSubmit(profileImage)}
          />
        )}
      </main>

      <JoinSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
