import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKakaoLoginRedirectUrl, loginWithEmail } from '@/api/auth';
import { setAuthTokens } from '@/utils/tokenStorage';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mapLoginErrorMessage(rawMessage?: string) {
  const message = (rawMessage ?? '').toLowerCase();
  if (message.includes('email') && (message.includes('not found') || message.includes('존재하지'))) return '* 가입되지 않은 이메일입니다.';
  if (message.includes('password') || message.includes('비밀번호')) return '* 비밀번호가 일치하지 않습니다.';
  return '* 로그인에 실패했습니다.';
}

export function useLoginPopup() {
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
      // ignore
    }
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;
  };

  const handleEmailLogin = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password.trim()) return setLoginError('* 이메일과 비밀번호를 입력해주세요.');
    if (!EMAIL_REGEX.test(trimmedEmail)) return setLoginError('* 이메일 형식이 적합하지 않습니다.');

    setLoginError('');
    try {
      const tokens = await loginWithEmail({ email: trimmedEmail, password });
      if (!tokens) return setLoginError('* 로그인 응답 형식이 올바르지 않습니다.');
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

  return { email, password, loginError, setEmail, setPassword, handleKakaoLogin, handleEmailLogin, navigate };
}
