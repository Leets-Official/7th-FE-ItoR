import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "@/pages/MainPage/MainPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import PostDetailPage from "@/pages/PostDetailPage";
import PostWritePage from "@/pages/PostWritePage/PostWritePage";
import MyPage from "@/pages/MyPage/MyPage";
import MyPageSetting from "@/pages/MyPageSetting/MyPageSetting";
import OAuthCallback from "@/pages/OAuthCallback";
import { ToastProvider } from "@/contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route path="/blog" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog/:postId" element={<PostDetailPage />} />
        <Route path="/write" element={<PostWritePage />} />
        <Route path="/edit/:postId" element={<PostWritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/setting" element={<MyPageSetting />} />
        <Route path="/oauth/kakao/success" element={<OAuthCallback />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
