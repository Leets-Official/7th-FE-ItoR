import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { registerWithEmail, registerWithOAuth, type OAuthLoginPayload } from '@/api/auth';
import { getMyProfile, updateUser, updateUserNickname, updateUserPassword, updateUserPicture } from '@/api/user';
import { useJoinForm } from '@/hooks/useJoinForm';
import { getAccessToken } from '@/utils/tokenStorage';
import { validateJoinForm, validateProfileUpdateForm, validateSocialSignupForm } from '@/utils/validation';

const DEFAULT_PROFILE_PICTURE_URL = 'https://example.com/profile.jpg';
export type SignupMethod = 'email' | 'kakao';

function parseStoredKakaoPayload(): OAuthLoginPayload | null {
  const rawPayload = sessionStorage.getItem('kakaoSignupPayload');

  if (!rawPayload) {
    return null;
  }

  try {
    return JSON.parse(rawPayload) as OAuthLoginPayload;
  } catch {
    return null;
  }
}

function getKakaoId(payload: OAuthLoginPayload | null) {
  if (!payload) {
    return null;
  }

  const id = payload.kakaoId ?? payload.id;
  return typeof id === 'number' ? id : null;
}

export function useEmailSignupFlow(signupMethod: SignupMethod = 'email') {
  const [hasToken, setHasToken] = useState(false);
  const {
    values,
    errors,
    canSubmit,
    setIsSubmitting,
    setValues,
    setErrors,
    handleChange,
    validate,
  } = useJoinForm((formValues) => {
    if (hasToken) {
      return validateProfileUpdateForm(formValues);
    }

    return signupMethod === 'kakao' ? validateSocialSignupForm(formValues) : validateJoinForm(formValues);
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [initialProfilePicture, setInitialProfilePicture] = useState<string | null>(null);
  const [kakaoId, setKakaoId] = useState<number | null>(null);

  const formatBirthDateInput = (rawValue: string) => {
    const digits = rawValue.replace(/\D/g, '').slice(0, 8);
    const year = digits.slice(0, 4);
    const month = digits.slice(4, 6);
    const day = digits.slice(6, 8);

    if (digits.length <= 4) {
      return year;
    }

    if (digits.length <= 6) {
      return `${year}-${month}`;
    }

    return `${year}-${month}-${day}`;
  };

  const padBirthDateSegment = (birthDate: string) => {
    const [year = '', month = '', day = ''] = birthDate.split('-');
    const paddedMonth = month.length === 1 ? month.padStart(2, '0') : month;
    const paddedDay = day.length === 1 ? day.padStart(2, '0') : day;

    if (!year) {
      return '';
    }

    if (!month) {
      return year;
    }

    if (!day) {
      return `${year}-${paddedMonth}`;
    }

    return `${year}-${paddedMonth}-${paddedDay}`;
  };

  const handleBirthDateChange = (rawValue: string) => {
    handleChange('birthDate', formatBirthDateInput(rawValue));
  };

  const handleBirthDateBlur = () => {
    handleChange('birthDate', padBirthDateSegment(values.birthDate));
  };

  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const hasToken = Boolean(getAccessToken());
      setHasToken(hasToken);

      if (signupMethod === 'kakao') {
        const kakaoPayload = parseStoredKakaoPayload();
        const nextKakaoId = getKakaoId(kakaoPayload);

        if (!nextKakaoId) {
          setSubmitError('* 카카오 인증 정보가 없습니다. 카카오로 회원가입을 다시 진행해주세요.');
        }

        setKakaoId(nextKakaoId);
        setValues({
          email: kakaoPayload?.email ?? '',
          password: '',
          passwordConfirm: '',
          name: kakaoPayload?.name ?? '',
          birthDate: '',
          nickname: '',
          introduction: '',
        });
        setInitialProfilePicture(kakaoPayload?.profilePicture ?? kakaoPayload?.profileImage ?? null);
        setIsBootstrapping(false);
        return;
      }

      if (!hasToken) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const me = await getMyProfile();

        if (!isMounted) {
          return;
        }

        setValues({
          email: me.email ?? '',
          password: '',
          passwordConfirm: '',
          name: me.name ?? '',
          birthDate: me.birthDate ?? '',
          nickname: me.nickname ?? '',
          introduction: me.introduction ?? '',
        });
        setInitialProfilePicture(me.profilePicture ?? null);
      } catch {
        if (!isMounted) {
          return;
        }
        setSubmitError('내 정보를 불러오지 못했습니다.');
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    void init();

    return () => {
      isMounted = false;
    };
  }, [setValues]);

  const handleSubmit = async (profilePicture: string | null) => {
    if (!validate()) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    try {
      if (signupMethod === 'kakao') {
        if (!kakaoId) {
          setSubmitError('* 카카오 인증 정보가 없습니다. 카카오로 회원가입을 다시 진행해주세요.');
          return;
        }

        await registerWithOAuth(
          values,
          profilePicture && !profilePicture.startsWith('blob:')
            ? profilePicture
            : initialProfilePicture || DEFAULT_PROFILE_PICTURE_URL,
          kakaoId,
        );
        sessionStorage.removeItem('kakaoSignupPayload');
        setErrors({});
        setIsSuccessModalOpen(true);
        return;
      }

      if (!hasToken) {
        await registerWithEmail(
          values,
          profilePicture && !profilePicture.startsWith('blob:') ? profilePicture : DEFAULT_PROFILE_PICTURE_URL,
        );
        setErrors({});
        setIsSuccessModalOpen(true);
        return;
      }

      await updateUser({
        email: values.email.trim(),
        nickname: values.nickname.trim(),
        profilePicture:
          profilePicture && !profilePicture.startsWith('blob:')
            ? profilePicture
            : initialProfilePicture || DEFAULT_PROFILE_PICTURE_URL,
        birthDate: values.birthDate.trim(),
        name: values.name.trim(),
        introduction: values.introduction.trim(),
      });

      if (values.nickname.trim()) {
        await updateUserNickname(values.nickname.trim());
      }

      if (values.password.trim()) {
        await updateUserPassword(values.password);
      }

      if (profilePicture && !profilePicture.startsWith('blob:')) {
        await updateUserPicture(profilePicture);
      }

      if (profilePicture?.startsWith('blob:')) {
        setSubmitError('* 현재는 이미지 URL 기반 저장만 지원됩니다. 파일 업로드 API 연동이 추가로 필요합니다.');
      }

      setErrors({});
      setIsSuccessModalOpen(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        const responseData = error.response?.data as
          | { message?: string; data?: { responseMessage?: string } }
          | undefined;
        setSubmitError(
          responseData?.message ??
            responseData?.data?.responseMessage ??
            '회원정보 수정에 실패했습니다.',
        );
        return;
      }

      setSubmitError('회원정보 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
