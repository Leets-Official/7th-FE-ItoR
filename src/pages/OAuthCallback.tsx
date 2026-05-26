import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleKakaoCallback } from "@/api/auth";
import { useUserStore, type User } from "@/store/useUserStore";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const flow = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        navigate("/blog", { replace: true });
        return;
      }

      try {
        const result = await handleKakaoCallback(code);

        if ("code" in result && result.code === 401) {
          navigate("/signup", { replace: true, state: { kakaoUser: result.data } });
          return;
        }

        const user = result as User;
        setUser(user);
        navigate("/blog", { replace: true });
      } catch {
        navigate("/blog", { replace: true });
      }
    };

    flow();
  }, [navigate, setUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
}
