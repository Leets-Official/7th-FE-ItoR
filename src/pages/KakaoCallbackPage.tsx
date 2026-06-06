import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { loginWithKakaoCode } from '@/api/auth';
import { setAuthTokens } from '@/utils/tokenStorage';

const processedKakaoCodes = new Set<string>();

export function KakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('카카오 로그인 처리 중입니다...');

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setMessage('인가 코드가 없습니다. 다시 로그인해주세요.');
      return;
    }

    if (processedKakaoCodes.has(code)) {
      return;
    }

    processedKakaoCodes.add(code);

    const run = async () => {
      try {
        const kakaoResult = await loginWithKakaoCode(code);

        if (!kakaoResult) {
          setMessage('카카오 응답 형식이 예상과 다릅니다.');
          return;
        }

        if (sessionStorage.getItem('kakaoSignupIntent') === 'true') {
          sessionStorage.removeItem('kakaoSignupIntent');
          sessionStorage.setItem('kakaoSignupPayload', JSON.stringify(kakaoResult));
          navigate('/signup/kakao', { replace: true });
          return;
        }

        if (!kakaoResult.accessToken || !kakaoResult.refreshToken) {
          setMessage(kakaoResult.responseMessage ?? '카카오 로그인 응답에 토큰이 없습니다.');
          return;
        }

        setAuthTokens(kakaoResult.accessToken, kakaoResult.refreshToken);
        navigate('/main', { replace: true });
      } catch (error) {
        processedKakaoCodes.delete(code);
        if (error instanceof AxiosError) {
          setMessage(error.response?.data?.message ?? '카카오 로그인에 실패했습니다.');
          return;
        }

        setMessage('카카오 로그인에 실패했습니다.');
      }
    };

    run();
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <p className="text-sm text-gray-20">{message}</p>
    </div>
  );
}
