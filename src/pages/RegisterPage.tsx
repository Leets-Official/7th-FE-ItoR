import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { KakaoLogoIcon, AddPhotoIcon, GITLOG } from '@/assets/icons';
import { Avatar } from '@/components/common/Avatar';
import { Header } from '@/components/layout/Header';
import { Modal } from '@/components/common/Modal';
import type { RegisterRequest } from '@/api/auth';
import { UserProfileForm } from '@/components/user/UserProfileForm';
import { useUserForm } from '@/hooks/useUserForm';
import { uploadImage } from '@/api/image';
import { useToast } from '@/hooks/useToast';
import { useRegisterMutation } from '@/hooks/queries/useAuth';

type Step = 'select' | 'form' | 'kakaoForm';

const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<Step>('select');
  const profileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const formMode = step === 'form' ? 'emailSignup' : 'kakaoSignup';
  const { values, errors, setFieldValue, validateForm } = useUserForm({ mode: formMode });
  const { showToast } = useToast();
  const registerMutation = useRegisterMutation(step === 'form' ? 'email' : 'kakao');

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!values.profilePicture) {
      showToast({ type: 'error', message: '프로필 사진을 등록해주세요.' });
      return;
    }

    const baseRequestData = {
      email: values.email.trim(),
      nickname: values.nickname.trim(),
      password: values.password,
      name: values.name.trim(),
      birthDate: values.birthDate.trim(),
      introduction: values.introduction.trim(),
      profilePicture: values.profilePicture,
    };

    const requestData: RegisterRequest =
      step === 'form'
        ? {
            ...baseRequestData,
            password: values.password,
          }
        : {
            ...baseRequestData,
            kakaoId: 12345,
          };

    try {
      const response = await registerMutation.mutateAsync(requestData);

      if (response.code === 0) {
        setIsModalOpen(true);
        return;
      }

      showToast({ type: 'error', message: response.message || '회원가입에 실패했습니다.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : '서버 통신에 실패했습니다.';
      console.error('register failed', error);
      showToast({ type: 'error', message });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  const handleProfileFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      showToast({ type: 'error', message: '이미지 파일만 업로드 가능합니다.' });
      event.target.value = '';
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      setFieldValue('profilePicture', imageUrl);
    } catch (error) {
      console.error('profile upload failed', error);
      showToast({ type: 'error', message: '프로필 이미지 업로드에 실패했습니다.' });
    }

    event.target.value = '';
  };

  return (
    <>
      <Header type="main" />

      <section className="bg-gray-96 border-b border-divider">
        <div className="mx-auto flex max-w-[980px] flex-col px-6 py-10">
          <h1 className="text-[24px] font-semibold text-gray-10">회원가입</h1>
          {step !== 'select' ? (
            <p className="mt-2 text-[12px] font-light text-gray-56">
              가입을 위해 회원님의 정보를 입력해주세요.
            </p>
          ) : null}
        </div>
      </section>

      {step === 'select' ? (
        <section className="mx-auto flex min-h-[520px] max-w-[980px] items-center px-6 py-16">
          <div className="grid w-full gap-14 md:grid-cols-[1fr_360px]">
            <div className="flex flex-col items-center justify-center">
              <GITLOG className="h-[88px] w-[230px] text-black" />
              <p className="mt-8 text-[14px] font-light text-gray-56">
                You can make anything by writing
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-6 flex justify-end">
                <div className="rounded-full bg-white px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <span className="text-[18px] font-black text-gray-10">YJ</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primaryOutline"
                  className="bg-btn-primary h-[42px] w-full rounded-[4px] border-none text-[13px] font-medium text-white"
                  onClick={() => setStep('form')}
                >
                  이메일로 회원가입
                </Button>

                <div className="flex items-center justify-center">
                  <div className="h-px flex-1 bg-gray-90" />
                  <span className="px-3 text-[11px] text-gray-56">또는</span>
                  <div className="h-px flex-1 bg-gray-90" />
                </div>

                <Button
                  variant="primaryOutline"
                  icon={<KakaoLogoIcon />}
                  iconClassName="h-[18px] w-[18px]"
                  onClick={() => setStep('kakaoForm')}
                  className="h-[42px] w-full rounded-[4px] border-none bg-kakao text-[14px] font-semibold text-black"
                >
                  카카오로 회원가입
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <form className="mx-auto w-full max-w-[980px] px-6 py-12" onSubmit={handleSubmit}>
          <div className="mx-auto max-w-[350px]">
            <div className="mb-8">
              <span className="text-[12px] font-light text-gray-56">프로필 사진</span>
              <div className="mt-4 flex flex-col items-start gap-4">
                <Avatar
                  size={64}
                  src={values.profilePicture}
                  fallback={values.nickname[0] || 'G'}
                  className="bg-gray-7 text-white"
                />
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileFileChange}
                />
                <Button
                  variant="ghost"
                  icon={<AddPhotoIcon />}
                  iconClassName="h-3.5 w-3.5"
                  className="border-gray-90 text-gray-56 h-[24px] rounded-[2px] border px-2 text-[11px]"
                  onClick={() => profileInputRef.current?.click()}
                >
                  프로필 사진 추가
                </Button>
              </div>
            </div>

            {step === 'kakaoForm' ? (
              <div className="mb-4">
                <span className="mb-2 block text-[12px] font-light text-gray-56">소셜 로그인</span>
                <div className="border-gray-90 bg-gray-96 flex h-[38px] items-center gap-2 rounded-[2px] border px-4 text-[13px] text-gray-56">
                  <KakaoLogoIcon className="h-4 w-4" />
                  <span>카카오 로그인</span>
                </div>
              </div>
            ) : null}

            <UserProfileForm
              values={values}
              errors={errors}
              fields={[
                'email',
                ...(step === 'form' ? (['password', 'passwordConfirm'] as const) : []),
                'name',
                'birthDate',
                'nickname',
                'introduction',
              ]}
              onChange={setFieldValue}
              className="flex flex-col gap-1"
              fieldClassName="w-full"
              size="default"
            />

            <div className="mt-8">
              <Button
                type="submit"
                variant="primaryOutline"
                disabled={registerMutation.isPending}
                className="text-btn-primary h-[42px] w-full rounded-[21px] border border-btn-primary bg-white text-[13px] font-medium"
              >
                {registerMutation.isPending ? '가입 중...' : '회원가입 완료'}
              </Button>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="w-[326px]">
            <Modal.Header>
              <Modal.Title>회원가입이 완료되었습니다!</Modal.Title>
            </Modal.Header>
            <Modal.Footer
              secondaryText="확인"
              onSecondaryClick={handleCloseModal}
              primaryText="로그인하기"
              onPrimaryClick={() => {
                handleCloseModal();
                navigate('/login');
              }}
            />
          </Modal>
        </form>
      )}
    </>
  );
};

export default RegisterPage;
