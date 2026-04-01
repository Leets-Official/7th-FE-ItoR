import { createBrowserRouter, redirect } from 'react-router';
import RootErrorBoundary from '@pages/error/RootErrorBoundary.tsx';
import PostListPage from '@pages/post/post-list/PostListPage.tsx';
import NotFoundPage from '@pages/not-found/NotFoundPage.tsx';
import RootLayout from '@apps/layouts/RootLayout.tsx';
import { ROUTE_PATH } from '@apps/routes/path.ts';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.ROOT,
    Component: RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        index: true,
        loader: () => redirect(ROUTE_PATH.POST.LIST),
      },
      {
        path: ROUTE_PATH.POST.LIST,
        Component: PostListPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
