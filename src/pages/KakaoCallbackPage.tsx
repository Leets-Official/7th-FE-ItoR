import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { loginWithKakaoCode } from '@/api/auth';
import { setAuthTokens } from '@/utils/tokenStorage';

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

    const run = async () => {
      try {
        const tokens = await loginWithKakaoCode(code);

        if (!tokens) {
          setMessage('로그인은 되었지만 토큰 응답 형식이 예상과 다릅니다.');
          return;
        }

        setAuthTokens(tokens.accessToken, tokens.refreshToken);
        navigate('/main', { replace: true });
      } catch (error) {
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
