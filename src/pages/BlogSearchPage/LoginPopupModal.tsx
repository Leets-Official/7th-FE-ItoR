import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { getKakaoLoginRedirectUrl, loginWithEmail } from '@/api/auth';
import { ClearIcon, GitlogLogoIcon, KakaoIcon } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import { Divider } from '@/components/common/Divider';
import { TextField } from '@/components/common/TextField';
import { setAuthTokens } from '@/utils/tokenStorage';

interface LoginPopupModalProps {
  onClose: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mapLoginErrorMessage(rawMessage?: string) {
  const message = (rawMessage ?? '').toLowerCase();

  if (message.includes('email') && (message.includes('not found') || message.includes('존재하지'))) {
    return '* 가입되지 않은 이메일입니다.';
  }

  if (message.includes('password') || message.includes('비밀번호')) {
    return '* 비밀번호가 일치하지 않습니다.';
  }

  return '* 로그인에 실패했습니다.';
}

export function LoginPopupModal({ onClose }: LoginPopupModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    try {
      const redirectUrl = await getKakaoLoginRedirectUrl();

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }
    } catch {
      // Fallback to direct backend endpoint when CORS blocks swagger-like requests.
    }

    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;
  };

  const handleEmailLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password.trim()) {
      setLoginError('* 이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setLoginError('* 이메일 형식이 적합하지 않습니다.');
      return;
    }

    setLoginError('');

    try {
      const tokens = await loginWithEmail({ email: trimmedEmail, password });

      if (!tokens) {
        setLoginError('* 로그인 응답 형식이 올바르지 않습니다.');
        return;
      }

      setAuthTokens(tokens.accessToken, tokens.refreshToken);
      navigate('/main', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoginError(mapLoginErrorMessage(error.response?.data?.message));
        return;
      }

      setLoginError('* 로그인에 실패했습니다.');
    }
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/30 backdrop-blur-[4px]">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative h-[675px] w-[358px] rounded-[9px] bg-dark px-0 pb-20 pt-20 md:h-[469px] md:w-[782px] md:px-4">
          <button
            type="button"
            className="absolute right-[16px] top-[16px] h-10 w-10 p-[13px]"
            aria-label="로그인 팝업 닫기"
            onClick={onClose}
          >
            <ClearIcon className="h-[14px] w-[14px] [&_path]:fill-white" />
          </button>

          <div className="flex h-[515px] flex-col items-center md:h-[309px] md:flex-row md:items-center md:justify-between md:gap-[18px]">
            <div className="flex h-[206px] w-[358px] min-w-[240px] flex-col items-center justify-center md:w-[391px]">
              <GitlogLogoIcon className="h-auto w-[280px] [&_path]:fill-white md:w-[308px]" />
              <p className="mt-6 px-4 py-3 text-center text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-56">
                You can make anything by writing
              </p>
            </div>

            <div className="flex h-[309px] w-[358px] min-w-[240px] flex-col items-center gap-[2px] px-4 md:w-[391px]">
              <div className="flex w-[326px] flex-col gap-[8px] px-4 py-1 md:w-[344px]">
                <TextField
                  size={14}
                  state="default"
                  className="w-[294px] border-[#E6E6E6] bg-white text-black placeholder:text-[#C8C8C8] md:w-[312px]"
                  placeholder="이메일"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  size={14}
                  state="default"
                  className="w-[294px] border-[#E6E6E6] bg-white text-black placeholder:text-[#C8C8C8] md:w-[312px]"
                  placeholder="비밀번호"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="w-[326px] px-4 py-1 md:w-[344px]">
                {loginError ? (
                  <p className="mb-2 text-xs font-light leading-[160%] tracking-[0] text-warning">{loginError}</p>
                ) : null}
                <Button
                  size="regular"
                  showIcon={false}
                  className="h-[45px] w-[294px] rounded-[6px] border-transparent bg-primary text-sm font-regular leading-[160%] tracking-[-0.07px] text-white hover:bg-primary hover:text-white md:w-[312px]"
                  onClick={handleEmailLogin}
                >
                  이메일로 로그인
                </Button>
              </div>

              <div className="flex w-[295px] items-center gap-2 px-2 py-1 md:w-[313px]">
                <Divider color="gray90" className="w-auto flex-1 bg-gray-33" />
                <span className="text-xs font-regular leading-[160%] tracking-[0] text-gray-56">SNS</span>
                <Divider color="gray90" className="w-auto flex-1 bg-gray-33" />
              </div>

              <div className="w-[326px] px-4 py-1 md:w-[344px]">
                <Button
                  size="regular"
                  showIcon
                  icon={<KakaoIcon aria-hidden="true" />}
                  className="h-[45px] w-[294px] rounded-[6px] border-transparent bg-[#FEE500] text-sm font-regular leading-[160%] tracking-[-0.07px] text-black hover:bg-[#FEE500] hover:text-black md:w-[312px] [&_svg]:h-[17px] [&_svg]:w-[18px]"
                  onClick={handleKakaoLogin}
                >
                  카카오로 로그인
                </Button>
              </div>

              <div className="flex justify-center py-1">
                <Button
                  size="text"
                  intent="gray"
                  showIcon={false}
                  className="h-[25px] px-2 py-[2px] text-xs font-regular leading-[160%] tracking-[0] text-gray-56 hover:bg-transparent"
                  onClick={() => navigate('/signup/email')}
                >
                  또는 회원가입
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
