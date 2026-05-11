import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages/BlogSearchPage';
import { BlogDetailPage } from '@/pages/BlogDetailPage';
import { KakaoCallbackPage } from '@/pages/KakaoCallbackPage';
import { EmailSignupPage } from '@/pages/MyPageJoinPage';
import { PlaygroundPage } from '@/pages/PlaygroundPage';
import { BlogWritePage } from '@/pages/BlogWritePage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/main" element={<LoginPage showLoginPopup={false} />} />
      <Route path="/login" element={<LoginPage showLoginPopup />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/blog/write" element={<BlogWritePage />} />
      <Route path="/blog/:id/edit" element={<BlogWritePage />} />
      <Route path="/signup/email" element={<EmailSignupPage />} />
      <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
      <Route path="/oauth/kakao/success" element={<KakaoCallbackPage />} />
      <Route path="/auth/kakao/redirect" element={<KakaoCallbackPage />} />
      <Route path="/blog-search" element={<Navigate to="/login" replace />} />
      <Route path="/mypage" element={<Navigate to="/signup/email" replace />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
