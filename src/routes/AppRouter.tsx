import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
