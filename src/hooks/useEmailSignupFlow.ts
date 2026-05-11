import { useState } from 'react';
import { AxiosError } from 'axios';

import { registerWithEmail } from '@/api/auth';
import { useJoinForm } from '@/hooks/useJoinForm';

export function useEmailSignupFlow() {
  const {
    values,
    errors,
    canSubmit,
    setIsSubmitting,
    handleChange,
    validate,
  } = useJoinForm();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  const handleSubmit = async (profilePicture: string | null) => {
    if (!validate()) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await registerWithEmail(values, profilePicture ?? '');
      setIsSuccessModalOpen(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        const responseData = error.response?.data as
          | { message?: string; data?: { responseMessage?: string } }
          | undefined;
        setSubmitError(
          responseData?.message ??
            responseData?.data?.responseMessage ??
            '회원가입에 실패했습니다.',
        );
        return;
      }

      setSubmitError('회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
