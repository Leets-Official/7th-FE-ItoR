import { isRouteErrorResponse, useRouteError } from 'react-router';

function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        {error.data ? <p>{String(error.data)}</p> : null}
      </main>
    );
  }

  if (error instanceof Error) {
    return (
      <main>
        <h1>Unexpected Error</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Unexpected Error</h1>
      <p>알 수 없는 오류가 발생했습니다.</p>
    </main>
  );
}

export default RootErrorBoundary;
