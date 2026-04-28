import type { ChangeEventHandler, FormEvent } from 'react';
import { useEffect, useState } from 'react';

import heroImage from './assets/hero.png';
import {
  getApiBaseUrl,
  getKakaoLoginUrl,
  loginUser,
  registerOauthUser,
  registerUser,
  reissueToken,
  type LoginPayload,
  type LoginResponseData,
  type RegisterOauthPayload,
  type RegisterPayload,
  type RegisterResponseData,
  type ReissueTokenPayload,
  type ReissueTokenResponseData,
} from './api/auth';
import { Button, Icon, Input } from './components/common';

type RoutePath = '/' | '/register';

type PostItem = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  comments: number;
  image?: string;
};

const API_BASE_URL = getApiBaseUrl();

const initialLoginForm: LoginPayload = {
  email: '',
  password: '',
};

const initialRegisterForm: RegisterPayload = {
  email: '',
  nickname: '',
  password: '',
  profilePicture: '',
  birthDate: '',
  name: '',
  introduction: '',
};

const initialOauthForm: RegisterOauthPayload = {
  email: '',
  nickname: '',
  profilePicture: '',
  birthDate: '',
  name: '',
  introduction: '',
  kakaoId: 0,
};

const initialReissueForm: ReissueTokenPayload = {
  refreshToken: '',
};

const posts: PostItem[] = [
  {
    id: 1,
    title: '16 Title one line',
    excerpt:
      "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type an...",
    author: '닉네임',
    date: 'Feb 17, 2025',
    comments: 0,
    image: heroImage,
  },
  {
    id: 2,
    title: '16 Title one line',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: '닉네임',
    date: 'Feb 17, 2025',
    comments: 0,
    image: heroImage,
  },
  {
    id: 3,
    title: '16 Title one line',
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type an...",
    author: '닉네임',
    date: 'Feb 17, 2025',
    comments: 0,
  },
  {
    id: 4,
    title: '16 Title one line',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: '닉네임',
    date: 'Feb 17, 2025',
    comments: 0,
  },
];

function getCurrentPath(): RoutePath {
  return window.location.pathname === '/register' ? '/register' : '/';
}

function App() {
  const [route, setRoute] = useState<RoutePath>(getCurrentPath);
  const [loginForm, setLoginForm] = useState<LoginPayload>(initialLoginForm);
  const [registerForm, setRegisterForm] = useState<RegisterPayload>(initialRegisterForm);
  const [oauthForm, setOauthForm] = useState<RegisterOauthPayload>(initialOauthForm);
  const [reissueForm, setReissueForm] = useState<ReissueTokenPayload>(initialReissueForm);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [isOauthSubmitting, setIsOauthSubmitting] = useState(false);
  const [isReissueSubmitting, setIsReissueSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [oauthError, setOauthError] = useState('');
  const [reissueError, setReissueError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [oauthSuccess, setOauthSuccess] = useState('');
  const [reissueSuccess, setReissueSuccess] = useState('');
  const [loginResult, setLoginResult] = useState<LoginResponseData | null>(null);
  const [registeredUser, setRegisteredUser] = useState<RegisterResponseData | null>(null);
  const [oauthRegisteredUser, setOauthRegisteredUser] = useState<RegisterResponseData | null>(null);
  const [reissuedTokens, setReissuedTokens] = useState<ReissueTokenResponseData | null>(null);

  useEffect(() => {
    const handlePopState = () => setRoute(getCurrentPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(path);
  };

  const updateLoginField = (field: keyof LoginPayload, value: string) => {
    setLoginForm((current) => ({ ...current, [field]: value }));
  };

  const updateRegisterField = (field: keyof RegisterPayload, value: string) => {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  };

  const updateOauthField = (field: keyof RegisterOauthPayload, value: string | number) => {
    setOauthForm((current) => ({ ...current, [field]: value }));
  };

  const updateReissueField = (field: keyof ReissueTokenPayload, value: string) => {
    setReissueForm((current) => ({ ...current, [field]: value }));
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoginSubmitting(true);
    setLoginError('');
    setLoginSuccess('');

    try {
      const response = await loginUser(loginForm);
      setLoginResult(response.data);
      setLoginSuccess(response.message || '로그인이 완료되었습니다.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인 요청 중 오류가 발생했습니다.';
      setLoginResult(null);
      setLoginError(message);
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsRegisterSubmitting(true);
    setRegisterError('');
    setRegisterSuccess('');

    try {
      const response = await registerUser(registerForm);
      setRegisteredUser(response.data);
      setRegisterSuccess(response.message || '일반 회원가입이 완료되었습니다.');
      setRegisterForm(initialRegisterForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : '일반 회원가입 요청 중 오류가 발생했습니다.';
      setRegisteredUser(null);
      setRegisterError(message);
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  const handleOauthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOauthSubmitting(true);
    setOauthError('');
    setOauthSuccess('');

    try {
      const response = await registerOauthUser(oauthForm);
      setOauthRegisteredUser(response.data);
      setOauthSuccess(response.message || 'OAuth 회원가입이 완료되었습니다.');
      setOauthForm(initialOauthForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'OAuth 회원가입 요청 중 오류가 발생했습니다.';
      setOauthRegisteredUser(null);
      setOauthError(message);
    } finally {
      setIsOauthSubmitting(false);
    }
  };

  const handleReissueSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsReissueSubmitting(true);
    setReissueError('');
    setReissueSuccess('');

    try {
      const response = await reissueToken(reissueForm);
      setReissuedTokens(response.data);
      setReissueSuccess(response.message || '토큰 재발급이 완료되었습니다.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '토큰 재발급 요청 중 오류가 발생했습니다.';
      setReissuedTokens(null);
      setReissueError(message);
    } finally {
      setIsReissueSubmitting(false);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#222222]">
      <header className="border-b border-[#efefea] bg-[#fcfcfa]">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-6">
          <div className="flex items-center gap-4">
            <button type="button" className="text-[#3d3d3d]" aria-label="메뉴" onClick={() => navigate('/')}>
              <Icon name="menu" size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-[22px] font-semibold italic tracking-tight text-black"
            >
              GITLOG
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/register')}>
              인증 테스트
            </Button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 text-[12px] font-medium text-[#8d8d8d] transition-colors hover:text-slate-900"
            >
              <Icon name="edit" size={14} />
              깃로그 쓰기
            </button>
          </div>
        </div>
      </header>

      {route === '/' ? (
        <HomePage onNavigateRegister={() => navigate('/register')} />
      ) : (
        <AuthPage
          apiBaseUrl={API_BASE_URL}
          isLoginSubmitting={isLoginSubmitting}
          isOauthSubmitting={isOauthSubmitting}
          isRegisterSubmitting={isRegisterSubmitting}
          isReissueSubmitting={isReissueSubmitting}
          kakaoLoginUrl={getKakaoLoginUrl()}
          loginError={loginError}
          loginForm={loginForm}
          loginResult={loginResult}
          loginSuccess={loginSuccess}
          loginUpdateField={updateLoginField}
          oauthError={oauthError}
          oauthForm={oauthForm}
          oauthRegisteredUser={oauthRegisteredUser}
          oauthSuccess={oauthSuccess}
          oauthUpdateField={updateOauthField}
          onBackHome={() => navigate('/')}
          onKakaoLogin={handleKakaoLogin}
          onLoginSubmit={handleLoginSubmit}
          onOauthSubmit={handleOauthSubmit}
          onRegisterSubmit={handleRegisterSubmit}
          onReissueSubmit={handleReissueSubmit}
          registerError={registerError}
          registerForm={registerForm}
          registerSuccess={registerSuccess}
          registerUpdateField={updateRegisterField}
          registeredUser={registeredUser}
          reissueError={reissueError}
          reissueForm={reissueForm}
          reissueSuccess={reissueSuccess}
          reissueUpdateField={updateReissueField}
          reissuedTokens={reissuedTokens}
        />
      )}
    </div>
  );
}

function HomePage({ onNavigateRegister }: { onNavigateRegister: () => void }) {
  return (
    <main className="mx-auto max-w-[1180px] px-5 pb-16 pt-10">
      <section className="mx-auto max-w-[700px]">
        <div className="mb-10 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d6f5e7] bg-[#ecfff7] shadow-[0_12px_30px_rgba(34,197,94,0.12)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b9ffdf] text-xl font-black text-[#111111]">
              YJ
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {posts.map((post) => (
            <article key={post.id} className="grid gap-5 border-b border-[#ecece5] py-6 md:grid-cols-[minmax(0,1fr)_96px]">
              <div className="min-w-0">
                <h2 className="text-[31px] font-medium leading-tight text-[#202020] md:text-[28px]">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-[14px] leading-7 text-[#8a8a84]">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] text-[#b1b1aa]">
                  <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,_#3459a8,_#8cd6ff)] text-[10px] font-semibold text-white">
                    N
                  </span>
                  <span className="font-medium text-[#7c7c76]">{post.author}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>댓글 {post.comments}</span>
                </div>
              </div>

              <div className="h-[96px] w-[96px] overflow-hidden rounded-sm bg-[#dfe5dc]">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(140deg,_#4d6b52,_#94b194)]" />
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={onNavigateRegister}>
            인증 페이지 보기
          </Button>
        </div>
      </section>
    </main>
  );
}

interface AuthPageProps {
  apiBaseUrl: string;
  kakaoLoginUrl: string;
  loginForm: LoginPayload;
  registerForm: RegisterPayload;
  oauthForm: RegisterOauthPayload;
  reissueForm: ReissueTokenPayload;
  isLoginSubmitting: boolean;
  isRegisterSubmitting: boolean;
  isOauthSubmitting: boolean;
  isReissueSubmitting: boolean;
  loginError: string;
  registerError: string;
  oauthError: string;
  reissueError: string;
  loginSuccess: string;
  registerSuccess: string;
  oauthSuccess: string;
  reissueSuccess: string;
  loginResult: LoginResponseData | null;
  registeredUser: RegisterResponseData | null;
  oauthRegisteredUser: RegisterResponseData | null;
  reissuedTokens: ReissueTokenResponseData | null;
  loginUpdateField: (field: keyof LoginPayload, value: string) => void;
  registerUpdateField: (field: keyof RegisterPayload, value: string) => void;
  oauthUpdateField: (field: keyof RegisterOauthPayload, value: string | number) => void;
  reissueUpdateField: (field: keyof ReissueTokenPayload, value: string) => void;
  onLoginSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRegisterSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onOauthSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReissueSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onKakaoLogin: () => void;
  onBackHome: () => void;
}

function AuthPage({
  apiBaseUrl,
  kakaoLoginUrl,
  loginForm,
  registerForm,
  oauthForm,
  reissueForm,
  isLoginSubmitting,
  isRegisterSubmitting,
  isOauthSubmitting,
  isReissueSubmitting,
  loginError,
  registerError,
  oauthError,
  reissueError,
  loginSuccess,
  registerSuccess,
  oauthSuccess,
  reissueSuccess,
  loginResult,
  registeredUser,
  oauthRegisteredUser,
  reissuedTokens,
  loginUpdateField,
  registerUpdateField,
  oauthUpdateField,
  reissueUpdateField,
  onLoginSubmit,
  onRegisterSubmit,
  onOauthSubmit,
  onReissueSubmit,
  onKakaoLogin,
  onBackHome,
}: AuthPageProps) {
  return (
    <main className="bg-[radial-gradient(circle_at_top,_#ecfeff,_#f8fafc_48%,_#e2e8f0)] px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Leets API</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">인증 API 연동</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                로그인, 회원가입, OAuth 회원가입, 토큰 재발급, 카카오 로그인 시작점까지 한 화면에서 확인할 수 있도록
                연결했습니다.
              </p>
            </div>

            <Button variant="outline" onClick={onBackHome}>
              홈으로 돌아가기
            </Button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            <ApiUrlCard title="로그인 URL" url={`${apiBaseUrl}/auth/login`} />
            <ApiUrlCard title="일반 회원가입 URL" url={`${apiBaseUrl}/auth/register`} />
            <ApiUrlCard title="OAuth 회원가입 URL" url={`${apiBaseUrl}/auth/register-oauth`} />
            <ApiUrlCard title="토큰 재발급 URL" url={`${apiBaseUrl}/auth/reissue`} />
            <ApiUrlCard title="카카오 로그인 URL" url={kakaoLoginUrl} />
          </div>
        </section>

        <section className="rounded-[32px] border border-[#f0e2b8] bg-[linear-gradient(135deg,_#fff9e8,_#fffef8)] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6a11]">Kakao OAuth</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">카카오 로그인 시작</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                `GET /auth/kakao`는 JSON 응답을 받는 API가 아니라 카카오 로그인 페이지로 이동시키는 리다이렉트 시작점입니다.
                Swagger에서 보인 CORS 오류는 이 특성 때문에 자연스럽고, 프론트에서는 아래 버튼처럼 브라우저를 직접
                이동시키는 방식으로 연동하는 게 맞습니다.
              </p>
              <p className="mt-3 break-all rounded-2xl border border-[#ead9a7] bg-white/80 px-4 py-3 text-sm text-slate-700">
                {kakaoLoginUrl}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Button type="button" variant="secondary" onClick={onKakaoLogin}>
                카카오 로그인으로 이동
              </Button>
              <a
                href={kakaoLoginUrl}
                className="text-center text-sm font-medium text-[#8b6a11] underline underline-offset-4"
              >
                새 탭에서 열기
              </a>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-2">
          <ApiFormSection
            title="로그인"
            description="이메일과 비밀번호로 `POST /auth/login` 요청을 보냅니다."
          >
            <form className="space-y-4" onSubmit={onLoginSubmit}>
              <Input
                id="login-email"
                type="email"
                label="이메일"
                placeholder="user@example.com"
                value={loginForm.email}
                onChange={(event) => loginUpdateField('email', event.target.value)}
                required
              />
              <Input
                id="login-password"
                type="password"
                label="비밀번호"
                placeholder="password123!"
                value={loginForm.password}
                onChange={(event) => loginUpdateField('password', event.target.value)}
                required
              />
              {loginError ? <StatusMessage tone="error" message={loginError} /> : null}
              {loginSuccess ? <StatusMessage tone="success" message={loginSuccess} /> : null}
              <Button type="submit" variant="primary" fullWidth disabled={isLoginSubmitting}>
                {isLoginSubmitting ? '로그인 요청 중...' : '로그인 요청 보내기'}
              </Button>
            </form>
            <ResponsePreview data={loginResult} />
          </ApiFormSection>

          <ApiFormSection
            title="일반 회원가입"
            description="비밀번호를 포함한 기본 회원가입 요청을 보냅니다."
          >
            <form className="space-y-4" onSubmit={onRegisterSubmit}>
              <Input
                id="register-email"
                type="email"
                label="이메일"
                placeholder="user@example.com"
                value={registerForm.email}
                onChange={(event) => registerUpdateField('email', event.target.value)}
                required
              />
              <Input
                id="register-nickname"
                label="닉네임"
                placeholder="john123"
                value={registerForm.nickname}
                onChange={(event) => registerUpdateField('nickname', event.target.value)}
                required
              />
              <Input
                id="register-password"
                type="password"
                label="비밀번호"
                placeholder="Password123!"
                value={registerForm.password}
                onChange={(event) => registerUpdateField('password', event.target.value)}
                required
              />
              <Input
                id="register-profilePicture"
                type="url"
                label="프로필 이미지 URL"
                placeholder="https://example.com/profile.jpg"
                value={registerForm.profilePicture}
                onChange={(event) => registerUpdateField('profilePicture', event.target.value)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="register-birthDate"
                  type="date"
                  label="생년월일"
                  value={registerForm.birthDate}
                  onChange={(event) => registerUpdateField('birthDate', event.target.value)}
                  required
                />
                <Input
                  id="register-name"
                  label="이름"
                  placeholder="김주영"
                  value={registerForm.name}
                  onChange={(event) => registerUpdateField('name', event.target.value)}
                  required
                />
              </div>
              <TextAreaField
                id="register-introduction"
                label="소개"
                placeholder="안녕하세요!"
                value={registerForm.introduction}
                onChange={(event) => registerUpdateField('introduction', event.target.value)}
              />
              {registerError ? <StatusMessage tone="error" message={registerError} /> : null}
              {registerSuccess ? <StatusMessage tone="success" message={registerSuccess} /> : null}
              <Button type="submit" variant="primary" fullWidth disabled={isRegisterSubmitting}>
                {isRegisterSubmitting ? '일반 회원가입 요청 중...' : '일반 회원가입 요청 보내기'}
              </Button>
            </form>
            <ResponsePreview data={registeredUser} />
          </ApiFormSection>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <ApiFormSection
            title="OAuth 회원가입"
            description="비밀번호 없이 `kakaoId`를 포함한 OAuth 회원가입 요청을 보냅니다."
          >
            <form className="space-y-4" onSubmit={onOauthSubmit}>
              <Input
                id="oauth-email"
                type="email"
                label="이메일"
                placeholder="user@example.com"
                value={oauthForm.email}
                onChange={(event) => oauthUpdateField('email', event.target.value)}
                required
              />
              <Input
                id="oauth-nickname"
                label="닉네임"
                placeholder="john123"
                value={oauthForm.nickname}
                onChange={(event) => oauthUpdateField('nickname', event.target.value)}
                required
              />
              <Input
                id="oauth-kakaoId"
                type="number"
                label="카카오 ID"
                placeholder="0"
                value={String(oauthForm.kakaoId)}
                onChange={(event) => oauthUpdateField('kakaoId', Number(event.target.value))}
                required
              />
              <Input
                id="oauth-profilePicture"
                type="url"
                label="프로필 이미지 URL"
                placeholder="https://example.com/profile.jpg"
                value={oauthForm.profilePicture}
                onChange={(event) => oauthUpdateField('profilePicture', event.target.value)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="oauth-birthDate"
                  type="date"
                  label="생년월일"
                  value={oauthForm.birthDate}
                  onChange={(event) => oauthUpdateField('birthDate', event.target.value)}
                  required
                />
                <Input
                  id="oauth-name"
                  label="이름"
                  placeholder="김주영"
                  value={oauthForm.name}
                  onChange={(event) => oauthUpdateField('name', event.target.value)}
                  required
                />
              </div>
              <TextAreaField
                id="oauth-introduction"
                label="소개"
                placeholder="안녕하세요!"
                value={oauthForm.introduction}
                onChange={(event) => oauthUpdateField('introduction', event.target.value)}
              />
              {oauthError ? <StatusMessage tone="error" message={oauthError} /> : null}
              {oauthSuccess ? <StatusMessage tone="success" message={oauthSuccess} /> : null}
              <Button type="submit" variant="secondary" fullWidth disabled={isOauthSubmitting}>
                {isOauthSubmitting ? 'OAuth 회원가입 요청 중...' : 'OAuth 회원가입 요청 보내기'}
              </Button>
            </form>
            <ResponsePreview data={oauthRegisteredUser} />
          </ApiFormSection>

          <ApiFormSection
            title="Access Token 재발급"
            description="`refreshToken` 하나만 보내서 `POST /auth/reissue`를 테스트할 수 있습니다."
          >
            <form className="space-y-4" onSubmit={onReissueSubmit}>
              <TextAreaField
                id="refreshToken"
                label="Refresh Token"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={reissueForm.refreshToken}
                onChange={(event) => reissueUpdateField('refreshToken', event.target.value)}
              />
              {reissueError ? <StatusMessage tone="error" message={reissueError} /> : null}
              {reissueSuccess ? <StatusMessage tone="success" message={reissueSuccess} /> : null}
              <Button type="submit" variant="primary" disabled={isReissueSubmitting}>
                {isReissueSubmitting ? '토큰 재발급 요청 중...' : '토큰 재발급 요청 보내기'}
              </Button>
            </form>
            <ResponsePreview data={reissuedTokens} />
          </ApiFormSection>
        </div>
      </div>
    </main>
  );
}

function ApiUrlCard({ title, url }: { title: string; url: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-sm text-slate-100">
      <p className="font-medium text-cyan-300">{title}</p>
      <p className="mt-2 break-all text-slate-200">{url}</p>
    </div>
  );
}

function ApiFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

function TextAreaField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm text-slate-700">
      <span className="font-medium text-slate-800">{label}</span>
      <textarea
        id={id}
        className="min-h-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}

function StatusMessage({ tone, message }: { tone: 'error' | 'success'; message: string }) {
  return (
    <div
      className={[
        'rounded-2xl border px-4 py-3 text-sm',
        tone === 'error'
          ? 'border-rose-200 bg-rose-50 text-rose-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700',
      ].join(' ')}
    >
      {message}
    </div>
  );
}

function ResponsePreview({ data }: { data: unknown }) {
  return (
    <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-700">응답 미리보기</p>
      <pre className="mt-3 overflow-x-auto text-[13px] leading-6 text-slate-700">
        {data ? JSON.stringify(data, null, 2) : '아직 성공 응답이 없습니다.'}
      </pre>
    </div>
  );
}

export default App;
