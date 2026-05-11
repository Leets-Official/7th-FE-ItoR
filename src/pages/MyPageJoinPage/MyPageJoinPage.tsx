import { GitlogLogoIcon, ReorderIcon } from '@/assets/icons';
import { useEmailSignupFlow } from '@/hooks/useEmailSignupFlow';
import { EmailSignupFormSection } from '@/pages/MyPageJoinPage/EmailSignupFormSection';
import { JoinSuccessModal } from '@/pages/MyPageJoinPage/JoinSuccessModal';
import { useProfileImage } from '@/hooks/useProfileImage';

export function EmailSignupPage() {
  const {
    values,
    errors,
    canSubmit,
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
    profileImageError,
    openFileDialog,
    handleProfileFileChange,
  } = useProfileImage();

  return (
    <div className="min-h-screen bg-gray-96 md:bg-white">
      <header className="h-[72px] border-b border-gray-96 bg-white">
        <div className="mx-auto flex h-full w-full max-w-[1366px] items-center px-3 md:px-4">
          <div className="flex items-center gap-[10px]">
            <button type="button" aria-label="메뉴 열기" className="flex h-10 w-10 items-center justify-center p-2">
              <ReorderIcon className="h-6 w-6" />
            </button>
            <GitlogLogoIcon className="h-10 w-[77px]" />
          </div>
        </div>
      </header>

      <section className="border-b border-gray-96 bg-gray-96">
        <div className="mx-auto w-full max-w-[1366px] md:bg-gray-96">
          <div className="mx-auto w-full max-w-[688px]">
            <div className="h-8 md:h-5" />
            <div className="px-4 py-3">
              <h1 className="text-2xl font-medium leading-[160%] tracking-[0] text-black">회원가입</h1>
              <p className="mt-3 text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-20">
                가입을 위해 회원님의 정보를 입력해주세요.
              </p>
            </div>
            <div className="h-8 md:h-5" />
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1366px] bg-white">
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
      </main>

      <JoinSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
