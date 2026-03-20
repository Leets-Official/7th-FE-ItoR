import { Outlet } from 'react-router';

function RootLayout() {
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
