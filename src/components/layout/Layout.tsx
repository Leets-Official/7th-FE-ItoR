import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f7] text-slate-950">
      <Header />

      <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)] xl:items-start">
          <aside className="hidden xl:sticky xl:top-24 xl:block">
            <Sidebar
              mode="profile"
              title="%{닉네임}"
              subtitle="%{한 줄 소개}"
              actions={[
                { label: '나의 깃로그', variant: 'cta-outline' },
                { label: '깃로그 쓰기', variant: 'cta-outline' },
              ]}
              footerActions={[
                { label: '설정', variant: 'cta-outline-muted' },
                { label: '로그아웃', variant: 'cta-outline-muted' },
              ]}
            />
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
