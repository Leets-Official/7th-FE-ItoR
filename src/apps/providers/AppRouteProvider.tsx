import { RouterProvider } from 'react-router';
import { router } from '@apps/routes/router.ts';

export default function AppRouteProvider() {
  return <RouterProvider router={router} />;
}
