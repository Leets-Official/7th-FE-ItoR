import { useNavigate } from 'react-router-dom';

import { getAuthEntryUrl, getKakaoLoginRedirectUrl } from '@/api/auth';
import { GitlogLogoIcon, KakaoIcon } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import { Divider } from '@/components/common/Divider';
import { PageHeader } from '@/components/common/PageHeader';

export function SignupChoicePage() {
  const navigate = useNavigate();

  const handleKakaoSignup = async () => {
    sessionStorage.setItem('kakaoSignupIntent', 'true');

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
        type="empty"
        className="h-[72px] border-b border-gray-90"
        authStateOverride="guest"
      />

      <section className="h-[114px] border-b border-[#F5F5F5] bg-[#F5F5F5]">
        <div className="mx-auto flex h-full w-full max-w-[688px] items-center px-4">
          <h1 className="text-2xl font-medium leading-[160%] text-black">회원가입</h1>
        </div>
      </section>

      <main className="mx-auto flex min-h-[506px] w-full max-w-[1366px] items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[640px] flex-col items-center gap-8 md:grid md:max-w-[760px] md:grid-cols-[1fr_312px] md:items-center md:gap-16">
          <div className="flex flex-col items-center text-center">
            <GitlogLogoIcon className="h-auto w-[260px] md:w-[308px]" />
            <p className="mt-8 text-sm font-light leading-[160%] text-gray-56">You can make anything by writing</p>
          </div>

          <div className="flex w-full max-w-[312px] flex-col items-center gap-4">
            <Button
              size="regular"
              showIcon={false}
              className="h-[45px] w-full rounded-[6px] border-transparent bg-primary text-white"
              onClick={() => navigate('/signup/email')}
            >
              이메일로 회원가입
            </Button>

            <div className="flex w-full items-center gap-2">
              <Divider color="gray90" className="w-auto flex-1" />
              <span className="text-xs leading-[160%] text-gray-56">또는</span>
              <Divider color="gray90" className="w-auto flex-1" />
            </div>

            <Button
              size="regular"
              showIcon
              icon={<KakaoIcon aria-hidden="true" />}
              className="h-[45px] w-full rounded-[6px] border-transparent bg-[#FEE500] text-black [&_svg]:h-[17px] [&_svg]:w-[18px]"
              onClick={handleKakaoSignup}
            >
              카카오로 회원가입
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
