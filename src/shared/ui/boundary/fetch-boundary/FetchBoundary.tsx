import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FetchErrorFallback } from '@shared/ui/boundary/fallback/Fallback.tsx';

type FetchBoundaryProps = {
  children: ReactNode;
  loadingFallback?: ReactNode;
};

export const FetchBoundary = ({ children, loadingFallback }: FetchBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={FetchErrorFallback}>
      <Suspense fallback={loadingFallback ? loadingFallback : <div>loading</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
