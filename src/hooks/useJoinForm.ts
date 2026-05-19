import { useMemo, useState } from 'react';

import { initialFormValues, type JoinFormErrors, type JoinFormValues } from '@/pages/MyPageEditPage/types';
import { validateJoinForm } from '@/utils/validation';

type ValidateFn = (values: JoinFormValues) => JoinFormErrors;

export function useJoinForm(validateFn: ValidateFn = validateJoinForm) {
  const [values, setValues] = useState<JoinFormValues>(initialFormValues);
  const [errors, setErrors] = useState<JoinFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

  const handleChange = (key: keyof JoinFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors = validateFn(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return {
    values,
    errors,
    isSubmitting,
    canSubmit,
    setIsSubmitting,
    setValues,
    setErrors,
    handleChange,
    validate,
  };
}
