import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages/BlogSearchPage';
import { BlogDetailPage } from '@/pages/BlogDetailPage';
import { KakaoCallbackPage } from '@/pages/KakaoCallbackPage';
import { MyPageEditPage } from '@/pages/MyPageEditPage';
import { MyPageHomePage } from '@/pages/MyPageHomePage';
import { PlaygroundPage } from '@/pages/PlaygroundPage';
import { BlogWritePage } from '@/pages/BlogWritePage';
import { SignupChoicePage } from '@/pages/SignupChoicePage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/main" element={<LoginPage showLoginPopup={false} />} />
      <Route path="/login" element={<LoginPage showLoginPopup />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/blog/write" element={<BlogWritePage />} />
      <Route path="/blog/:id/edit" element={<BlogWritePage />} />
      <Route path="/signup" element={<SignupChoicePage />} />
      <Route path="/signup/email" element={<MyPageEditPage />} />
      <Route path="/signup/kakao" element={<MyPageEditPage signupMethod="kakao" />} />
      <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
      <Route path="/oauth/kakao/success" element={<KakaoCallbackPage />} />
      <Route path="/auth/kakao/redirect" element={<KakaoCallbackPage />} />
      <Route path="/blog-search" element={<Navigate to="/login" replace />} />
      <Route path="/mypage" element={<MyPageHomePage />} />
      <Route path="/" element={<Navigate to="/blog-search" replace />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
