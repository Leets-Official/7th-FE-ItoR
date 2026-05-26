import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@/components/Avatar/Avatar";
import TextFieldSet from "@/components/Text/TextFieldSet";
import Modal from "@/components/Modal/Modal";
import PageLayout from "@/layouts/PageLayout";
import { PlusIcon, KakaoIcon } from "@/assets/icons";
import * as S from "./MyPageSetting.styled";
import TextField from "@/components/Text/TextField";
import { useUserStore, type User } from "@/store/useUserStore";
import { updateUserInfo } from "@/api/userApi";
import { useToast } from "@/contexts/ToastContext";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useImageValidation } from "@/hooks/useImageValidation";
import { useApiError } from "@/hooks/useApiError";
import MyPageSettingSkeleton from "./MyPageSettingSkeleton";

type FormState = {
  email: string;
  name: string;
  birth: string;
  nickname: string;
  intro: string;
  profile: string;
};

export default function MyPageSetting() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user, setUser } = useUserStore();
  const { showToast } = useToast();
  const { uploadImage } = useImageUpload();
  const { validateAndShowError } = useImageValidation();
  const { handleError } = useApiError();

  const loginType = user?.loginType ?? "email";
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
    profile: "",
  });

  const [tempForm, setTempForm] = useState<FormState>(form);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loaded = {
      email: user.email ?? "",
      name: user.name ?? "",
      birth: user.birthDate ?? "",
      nickname: user.nickname ?? "",
      intro: user.introduction ?? "",
      profile: user.profilePicture ?? "",
    };

    setForm(loaded);
    setTempForm(loaded);
    setLoading(false);
  }, [user]);

  const handleChange = (field: keyof FormState, value: string) => {
    setTempForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmCancel = () => {
    setTempForm(form);
    setIsEditMode(false);
    setIsCancelModalOpen(false);
  };

  const handleSaveClick = async () => {
    try {
      const res = await updateUserInfo({
        email: tempForm.email,
        name: tempForm.name,
        birthDate: tempForm.birth,
        nickname: tempForm.nickname,
        introduction: tempForm.intro,
        profilePicture: tempForm.profile,
      });

      if (res.code !== 200 || !res.data) {
        showToast("수정에 실패했습니다.", "error");
        return;
      }

      const serverUser = res.data;

      const updatedUser: User = {
        ...serverUser,
        loginType: user?.loginType ?? serverUser.loginType ?? "email",
      };

      setUser(updatedUser);

      setForm({
        email: updatedUser.email,
        name: updatedUser.name,
        birth: updatedUser.birthDate,
        nickname: updatedUser.nickname,
        intro: updatedUser.introduction,
        profile: updatedUser.profilePicture,
      });

      setIsEditMode(false);
      navigate("/mypage", { state: { toastMessage: "저장되었습니다!" } });
    } catch (error) {
      handleError(error, "사용자 정보 수정");
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateAndShowError(file)) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => setTempForm((prev) => ({ ...prev, profile: reader.result as string }));
      reader.readAsDataURL(file);

      const uploaded = await uploadImage(file);
      setTempForm((prev) => ({ ...prev, profile: uploaded }));
    } catch (error) {
      handleError(error, "프로필 사진 업로드");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <PageLayout
      headerVariant={isEditMode ? "saveCancel" : "edit"}
      onEditClick={() => setIsEditMode(true)}
      onCancelClick={() => setIsCancelModalOpen(true)}
      onSaveClick={handleSaveClick}
    >
      {loading ? (
        <MyPageSettingSkeleton />
      ) : (
        <>
          <section className={S.profileSection}>
            <div className={S.profileSectionInner}>
              <div className={S.avatarWrapper}>
                <Avatar src={tempForm.profile} size="lg" />
                {isEditMode && (
                  <>
                    <button
                      className={S.addIconButton}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <PlusIcon width={22} height={22} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </>
                )}
              </div>

              <main className={S.profileHeader}>
                <TextFieldSet
                  variant="backless"
                  size="lg"
                  className={S.nickname}
                  value={tempForm.nickname}
                  helperText="20자 이내"
                  disabled={!isEditMode}
                  onChange={(e) => handleChange("nickname", e.target.value)}
                />
                <TextFieldSet
                  variant="backless"
                  value={tempForm.intro}
                  disabled={!isEditMode}
                  onChange={(e) => handleChange("intro", e.target.value)}
                />
              </main>
            </div>
          </section>

          <main className={S.formWrapper}>
            {loginType === "kakao" && (
              <div className={S.socialWrapper}>
                <KakaoIcon className={S.kakaoIcon} />
                <TextField value="카카오 로그인" disabled fullWidth className={S.kakaoTextField} />
              </div>
            )}

            {["email", "name", "birth"].map((field) => (
              <TextFieldSet
                key={field}
                title={field === "email" ? "이메일" : field === "name" ? "이름" : "생년월일"}
                placeholder={field === "birth" ? "YYYY-MM-DD" : ""}
                value={tempForm[field as keyof FormState]}
                disabled={!isEditMode}
                onChange={(e) => handleChange(field as keyof FormState, e.target.value)}
              />
            ))}
          </main>
        </>
      )}

      <Modal
        open={isCancelModalOpen}
        title="변경을 취소하시겠습니까?"
        description="지금까지의 수정 내용은 저장되지 않습니다."
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        confirmText="취소하기"
        cancelText="계속 수정하기"
      />
    </PageLayout>
  );
}
