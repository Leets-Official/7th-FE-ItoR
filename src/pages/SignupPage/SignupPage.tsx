import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import SignupSection from "@/components/Auth/SignupSection";
import SignupForm from "@/components/Auth/SignupForm";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import * as S from "./SignupPage.styled";

export default function SignupPage() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [signupType, setSignupType] = useState<"select" | "email" | "kakao">("select");
  const kakaoUser = location.state?.kakaoUser;

  useEffect(() => {
    if (kakaoUser) {
      setSignupType("kakao");
    }
  }, [kakaoUser]);

  return (
    <main className={S.signupPage}>
      <div className={S.headerFixed}>
        <Header title="GITLOG" variant="plain" onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

      <div className={S.headerSpacer} />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar
              variant="guest"
              onLoginClick={() => {
                setIsLoginOpen(true);
                setIsSidebarOpen(false);
              }}
            />
          </aside>
        </>
      )}

      <div className={S.bgSection}>
        <div className={S.containerInner}>
          <h2 className="text-2xl font-bold">회원가입</h2>

          {signupType !== "select" && (
            <p className={S.subtitle}>가입을 위해 회원님의 정보를 입력해 주세요.</p>
          )}
        </div>
      </div>

      <section className={S.sectionWrapper}>
        {signupType === "select" && <SignupSection onSelect={setSignupType} />}
        {signupType === "email" && <SignupForm type="email" />}
        {signupType === "kakao" && kakaoUser && <SignupForm type="kakao" kakaoUser={kakaoUser} />}
      </section>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
}
