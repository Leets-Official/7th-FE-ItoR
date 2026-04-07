import { Outlet } from 'react-router';

function RootLayout() {
  return (
    <div className='min-h-screen bg-[#101010]'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
