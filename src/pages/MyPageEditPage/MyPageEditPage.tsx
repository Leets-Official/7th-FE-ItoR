import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/common/PageHeader';
import { useEmailSignupFlow } from '@/hooks/useEmailSignupFlow';
import { useProfileImage } from '@/hooks/useProfileImage';
import { EmailSignupFormSection } from '@/pages/MyPageEditPage/EmailSignupFormSection';
import { JoinSuccessModal } from '@/pages/MyPageEditPage/JoinSuccessModal';

export function MyPageEditPage() {
  const navigate = useNavigate();
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
  } = useEmailSignupFlow();

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

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        type="write"
        className="h-[72px] border-b border-gray-90"
        onCancelClick={() => navigate(-1)}
        onSubmitPost={() => handleSubmit(profileImage)}
        cancelLabel="취소하기"
        submitLabel="저장하기"
        isSubmitDisabled={!canSubmit}
      />

      <main className="mx-auto w-full max-w-[1366px] bg-white">
        {isBootstrapping ? (
          <div className="px-4 py-8 text-sm text-gray-56">내 정보를 불러오는 중입니다.</div>
        ) : (
          <EmailSignupFormSection
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
