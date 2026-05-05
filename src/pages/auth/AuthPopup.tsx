import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IconButton } from '@/components/common/IconButton';
import { ClearIcon, KakaoLogoIcon, GITLOG } from '@/assets/icons';
import { Button } from '@/components/common/Button';
import { TextField } from '@/components/common/TextField';
import { getKakaoLoginUrl } from '@/api/auth';
import { useEmailLoginMutation } from '@/hooks/queries/useAuth';

interface AuthPopupProps {
  onClose?: () => void;
  onUnregistered?: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

export const AuthPopup = ({ onClose, onUnregistered }: AuthPopupProps) => {
  const navigate = useNavigate();
  const loginMutation = useEmailLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      if (response.code === 0) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        navigate('/');
        onClose?.();
        return;
      }

      if (response.code === 404 || response.message.includes('not found')) {
        setError('email', { message: '가입되지 않은 이메일입니다.' });
        onUnregistered?.();
        return;
      }

      if (response.code === 401 || response.message.includes('password')) {
        setError('password', { message: '비밀번호가 올바르지 않습니다.' });
        return;
      }

      window.alert(response.message || '로그인 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('login failed', error);
      window.alert('서버와 통신하지 못했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-gray-7 relative flex min-h-[332px] w-full max-w-[560px] overflow-hidden rounded-[8px] shadow-[0_20px_50px_var(--color-shadow-popup)] md:max-w-[720px]">
        <IconButton
          icon={<ClearIcon />}
          size="frame"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 z-20 text-white hover:bg-white/10 hover:text-white"
        />

        <div className="hidden flex-1 flex-col items-center justify-center px-10 text-center md:flex">
          <div className="flex items-center justify-center">
            <GITLOG className="h-[86px] w-[220px] text-white" />
          </div>
          <p className="mt-8 text-[14px] font-light text-gray-56">
            You can make anything by writing
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 py-10 md:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <TextField
                placeholder="이메일"
                autoComplete="email"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '이메일 형식이 올바르지 않습니다.',
                  },
                })}
                isError={!!errors.email}
                helpText={errors.email?.message}
                size="default"
                className="w-full gap-1 px-0 py-0"
              />

              <TextField
                type="password"
                placeholder="비밀번호"
                autoComplete="current-password"
                {...register('password', { required: '비밀번호를 입력해주세요.' })}
                isError={!!errors.password}
                helpText={errors.password?.message}
                size="default"
                className="w-full gap-1 px-0 py-0"
              />
            </div>

            <div className="mt-3">
              <Button
                type="submit"
                variant="primaryOutline"
                disabled={loginMutation.isPending}
                className="bg-btn-primary h-[42px] w-full rounded-[4px] border-none text-[13px] font-medium text-white"
              >
                {loginMutation.isPending ? '로그인 중...' : '이메일로 로그인'}
              </Button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-center">
            <div className="h-px flex-1 bg-gray-20" />
            <span className="px-3 text-[11px] font-medium text-gray-56">SNS</span>
            <div className="h-px flex-1 bg-gray-20" />
          </div>

          <div className="mt-4">
            <Button
              variant="primaryOutline"
              icon={<KakaoLogoIcon />}
              iconClassName="h-[18px] w-[18px]"
              onClick={() => {
                window.location.href = getKakaoLoginUrl();
              }}
              className="h-[42px] w-full rounded-[4px] border-none bg-kakao text-[14px] font-semibold text-black"
            >
              카카오로 로그인
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose?.();
              navigate('/register');
            }}
            className="mt-4 text-center text-[12px] font-light text-gray-56 transition-opacity hover:opacity-80"
          >
            또는 회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
