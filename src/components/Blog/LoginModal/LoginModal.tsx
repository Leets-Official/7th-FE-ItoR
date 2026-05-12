import React, { useState } from "react";
import TextField from "@/components/Text/TextField";
import { KakaoIcon, ClearIcon } from "@/assets/icons";
import {
  backdrop,
  wrapper,
  leftSection,
  rightSection,
  title,
  subtitle,
  inputGroup,
  loginButton,
  snsDivider,
  kakaoButton,
  footer,
  closeButton,
  errorText,
} from "./LoginModal.styled";
import { useNavigate } from "react-router-dom";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useAuth } from "@/hooks/useAuth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSignupPrompt?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSignupPrompt }) => {
  const { handleLogin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useScrollLock(open);
  if (!open) return null;

  const handleLoginClick = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("이메일을 입력해 주세요.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const ok = await handleLogin(email, password);
      if (ok) {
        onClose();
        navigate("/blog");
      } else {
        setPasswordError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error: unknown) {
      const err = error as { response?: { code?: number }; message?: string };

      if (err.response?.code === 401 || err.message?.includes("가입되지 않은")) {
        onClose();
        onSignupPrompt?.();
      } else {
        setPasswordError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;
    window.location.href = kakaoAuthUrl;
  };

  const handleSignupClick = () => {
    onClose();
    navigate("/signup");
  };

  return (
    <div className={backdrop}>
      <div className={wrapper}>
        <button className={closeButton} onClick={onClose} aria-label="로그인 모달 닫기">
          <ClearIcon className="h-6 w-6" />
        </button>

        <div className={leftSection}>
          <h1 className={title}>GITLOG</h1>
          <p className={subtitle}>You can make anything by writing</p>
        </div>

        <div className={rightSection}>
          <div className={inputGroup}>
            <TextField
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {emailError && <p className={errorText}>*{emailError}</p>}
            {passwordError && <p className={errorText}>*{passwordError}</p>}
          </div>

          <button className={loginButton} onClick={handleLoginClick} disabled={loading}>
            {loading ? "로그인 중..." : "이메일로 로그인"}
          </button>

          <div className={snsDivider}>
            <span>SNS</span>
          </div>

          <button className={kakaoButton} onClick={handleKakaoLogin}>
            <KakaoIcon className="h-5 w-5" />
            카카오로 로그인
          </button>

          <p
            className={`${footer} hover:text-brand-blue cursor-pointer transition`}
            onClick={handleSignupClick}
          >
            또는 회원가입
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
