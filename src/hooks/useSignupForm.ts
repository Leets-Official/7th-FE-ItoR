import { useState } from "react";
import * as E from "@/utils/validators";

export const useSignupForm = (type: "email" | "kakao") => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    newErrors.email = E.validateEmail(form.email);
    newErrors.name = E.validateName(form.name);
    newErrors.nickname = E.validateNickname(form.nickname);
    newErrors.birth = E.validateBirth(form.birth);
    newErrors.intro = E.validateIntro(form.intro);

    if (type === "email") {
      newErrors.passwordConfirm = E.validatePasswordConfirm(form.password, form.passwordConfirm);
    }

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim() && !newErrors[key]) {
        newErrors[key] = "반드시 입력해야하는 필수 사항입니다";
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((v) => !v);
  };

  const handleSubmit = () => {
    if (validateForm()) setIsModalOpen(true);
  };

  return {
    form,
    errors,
    isModalOpen,
    isLoginModalOpen,
    handleChange,
    handleSubmit,
    setIsModalOpen,
    setIsLoginModalOpen,
  };
};
