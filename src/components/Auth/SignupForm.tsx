import React, { useState, useRef } from "react";
import * as S from "./Signup.styled";
import TextFieldSet from "@/components/Text/TextFieldSet";
import Button from "@/components/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
import SmallButton from "@/components/SmallButton/SmallButton";
import { AddPhotoAlternateIcon, KakaoIcon } from "@/assets/icons";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import { register, registerKakao } from "@/api/auth";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useImageValidation } from "@/hooks/useImageValidation";
import { useApiError } from "@/hooks/useApiError";

interface SignupFormProps {
  type: "email" | "kakao";
  kakaoUser?: {
    email: string;
    name: string;
    profilePicture: string;
    kakaoId: number;
  };
}

const SignupForm: React.FC<SignupFormProps> = ({ type, kakaoUser }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadImage, uploading } = useImageUpload();
  const { validateAndShowError } = useImageValidation();
  const { handleError } = useApiError();

  const [form, setForm] = useState({
    email: kakaoUser?.email || "",
    password: "",
    passwordConfirm: "",
    name: kakaoUser?.name || "",
    birthDate: "",
    nickname: "",
    introduction: "",
    profilePicture: kakaoUser?.profilePicture || "",
    kakaoId: kakaoUser?.kakaoId?.toString() || "",
  });

  const [previewUrl, setPreviewUrl] = useState<string>(kakaoUser?.profilePicture || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateAndShowError(file)) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);

      const uploadedUrl = await uploadImage(file);
      setForm((prev) => ({ ...prev, profilePicture: uploadedUrl }));
    } catch (error) {
      handleError(error, "프로필 사진 업로드");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!form.email.trim()) newErrors.email = "이메일을 입력해 주세요.";
    else if (!emailRegex.test(form.email)) newErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!form.name.trim()) newErrors.name = "이름을 입력해 주세요.";
    if (!form.birthDate.trim()) newErrors.birthDate = "생년월일을 입력해 주세요.";
    else if (!birthRegex.test(form.birthDate))
      newErrors.birthDate = "YYYY-MM-DD 형식으로 입력해 주세요.";
    if (!form.nickname.trim()) newErrors.nickname = "닉네임을 입력해 주세요.";
    else if (form.nickname.length > 20) newErrors.nickname = "닉네임은 20자 이내로 입력해 주세요.";

    if (type === "email") {
      if (!form.password) newErrors.password = "비밀번호를 입력해 주세요.";
      else if (form.password.length < 8)
        newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
      if (form.password !== form.passwordConfirm)
        newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const commonData = {
      email: form.email,
      nickname: form.nickname,
      birthDate: form.birthDate,
      name: form.name,
      introduction: form.introduction,
      profilePicture: form.profilePicture,
    };

    try {
      setLoading(true);
      if (type === "email") {
        await register({ ...commonData, password: form.password });
      } else {
        await registerKakao({ ...commonData, kakaoId: Number(form.kakaoId) });
      }
      setIsModalOpen(true);
    } catch (error) {
      handleError(error, "회원가입");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "email", title: "이메일", placeholder: "이메일" },
    ...(type === "email"
      ? [
          { key: "password", title: "비밀번호", placeholder: "비밀번호", type: "password" },
          {
            key: "passwordConfirm",
            title: "비밀번호 확인",
            placeholder: "비밀번호 확인",
            type: "password",
          },
        ]
      : []),
    { key: "name", title: "이름", placeholder: "이름" },
    { key: "birthDate", title: "생년월일", placeholder: "YYYY-MM-DD" },
    { key: "nickname", title: "닉네임", placeholder: "닉네임", helperText: "20글자 이내" },
    { key: "introduction", title: "한 줄 소개", placeholder: "한 줄 소개" },
  ];

  return (
    <div className={S.signupFormContainer}>
      <div className={S.profileSection}>
        <label className={S.profileLabel}>프로필 사진</label>
        <div className={S.profileInner}>
          <Avatar size="xl" src={previewUrl} alt="Profile" />

          <SmallButton
            label={uploading ? "업로드 중..." : "프로필 사진 추가"}
            variant="secondaryOutline"
            leftIcon={<AddPhotoAlternateIcon className={S.profileAddIcon} />}
            className="border-brand-lightGray text-xs"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      {type === "kakao" && (
        <div className={S.socialSection}>
          <p className={S.socialLabel}>소셜 로그인</p>
          <div className={S.socialWrapper}>
            <KakaoIcon className={S.kakaoIcon} />
            <TextField value="카카오 로그인" disabled fullWidth className={S.kakaoTextField} />
          </div>
        </div>
      )}

      <div className={S.signupFormFields}>
        {fields.map(({ key, title, placeholder, helperText, type }) => (
          <TextFieldSet
            key={key}
            title={title}
            placeholder={placeholder}
            helperText={helperText}
            type={type}
            value={form[key as keyof typeof form]}
            onChange={(e) => handleChange(key, e.target.value)}
            error={errors[key]}
          />
        ))}
      </div>

      <Button
        label={loading ? "회원가입 중..." : "회원가입 완료"}
        variant="primaryOutline"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      />

      <Modal
        open={isModalOpen}
        title="회원가입이 완료되었습니다"
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsLoginModalOpen(true)}
        cancelText="확인"
        confirmText="로그인하기"
        cancelColor="bg-white text-brand-darkGray border border-brand-lightGray hover:bg-brand-lightGray"
        confirmColor="bg-brand-blue text-white hover:bg-brand-blue/90"
      />

      <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default SignupForm;
