import { Navigate, Route, Routes } from 'react-router-dom';

import { BlogSearchPage } from '@/pages/BlogSearchPage';
import { PlaygroundPage } from '@/pages/PlaygroundPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blog-search" replace />} />
      <Route path="/blog-search" element={<BlogSearchPage />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
