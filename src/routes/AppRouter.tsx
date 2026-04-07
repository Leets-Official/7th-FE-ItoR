import { Navigate, Route, Routes } from 'react-router-dom';

import { PlaygroundPage } from '@/pages/PlaygroundPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/playground" replace />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
