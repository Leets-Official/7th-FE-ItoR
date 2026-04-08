import { Link, Outlet } from 'react-router';
import { ROUTE_PATH } from '@apps/routes/path.ts';
import { Header } from '@shared/ui';

function MenuIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M5 7h14M5 12h14M5 17h14'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.8'
      />
    </svg>
  );
}

function WriteIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M4 17.25V20h2.75L17.8 8.94l-2.75-2.75L4 17.25Zm15.71-9.04a1 1 0 0 0 0-1.42l-2.5-2.5a1 1 0 0 0-1.42 0l-.98.98 3.92 3.92.98-.98Z'
        fill='currentColor'
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <circle cx='11' cy='11' r='5.5' stroke='currentColor' strokeWidth='1.8' />
      <path d='m15.5 15.5 4 4' stroke='currentColor' strokeLinecap='round' strokeWidth='1.8' />
    </svg>
  );
}

function RootLayout() {
  return (
    <div className='min-h-screen bg-[#101010] px-[1.6rem] py-[1.6rem] md:px-[2.4rem] md:py-[2.4rem]'>
      <div className='mx-auto max-w-[120rem] overflow-hidden rounded-[2.8rem] border border-[#e6e6e6] bg-white shadow-[0_3.2rem_8rem_rgba(0,0,0,0.18)]'>
        <Header.Root className='sticky top-0 z-20 border-b border-[#f1f1f1] px-[1.6rem] py-[1.8rem] md:px-[3.2rem]'>
          <Header.Left className='gap-[1.2rem]'>
            <Header.MenuButton aria-label='Open menu' icon={<MenuIcon />} />
            <Header.Brand asChild className='text-[2.8rem] md:text-[3.2rem]'>
              <Link to={ROUTE_PATH.POST.LIST}>GITLOG</Link>
            </Header.Brand>
          </Header.Left>
          <Header.Right className='gap-[0.8rem] md:gap-[1.2rem]'>
            <Header.MenuButton aria-label='Search posts' icon={<SearchIcon />} />
            <Header.ActionButton className='gap-[0.6rem] text-[#8f8f8f]'>
              <WriteIcon />
              <span className='hidden md:inline'>Write post</span>
            </Header.ActionButton>
          </Header.Right>
        </Header.Root>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
