import PageHeaderLeft from '@/components/common/PageHeader/PageHeaderLeft';
import PageHeaderRight from '@/components/common/PageHeader/PageHeaderRight';
import { ProfileCard } from '@/components/common/ProfileCard';
import { cn } from '@/utils/cn';
import { clearAuthTokens, getAccessToken } from '@/utils/tokenStorage';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PageHeaderActionProps, PageHeaderType } from './types';

interface PageHeaderProps extends PageHeaderActionProps {
  className?: string;
  type: PageHeaderType;
}

function PageHeader({
  className = '',
  type,
  onCommentClick,
  onSubmitPost,
  canManagePost,
  isPostMenuOpen,
  onTogglePostMenu,
  onEditPost,
  onDeletePost,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const profileCardRef = useRef<HTMLDivElement | null>(null);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);

  const isLoggedIn = useMemo(() => Boolean(getAccessToken()), []);

  useEffect(() => {
    if (!isProfileCardOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!profileCardRef.current?.contains(event.target as Node)) {
        setIsProfileCardOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isProfileCardOpen]);

  const handleToggleProfileCard = () => {
    setIsProfileCardOpen((prev) => !prev);
  };

  const handleGoHome = () => {
    navigate('/main');
    setIsProfileCardOpen(false);
  };

  const handleGoWrite = () => {
    navigate('/blog/write');
    setIsProfileCardOpen(false);
  };

  const handleGoLogin = () => {
    navigate('/login');
    setIsProfileCardOpen(false);
  };

  const handleLogout = () => {
    clearAuthTokens();
    navigate('/login');
    setIsProfileCardOpen(false);
  };

  return (
    <div className="relative">
      <header className={cn('flex h-[74px] w-full items-center justify-between bg-white px-4 py-3', className)}>
        <PageHeaderLeft onMenuClick={handleToggleProfileCard} onLogoClick={handleGoHome} />
        <PageHeaderRight
          type={type}
          onCommentClick={onCommentClick}
          onWriteClick={handleGoWrite}
          onSubmitPost={onSubmitPost}
          canManagePost={canManagePost}
          isPostMenuOpen={isPostMenuOpen}
          onTogglePostMenu={onTogglePostMenu}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
        />
      </header>

      {isProfileCardOpen ? (
        <div ref={profileCardRef} className="absolute top-[74px] left-0 z-30">
          <ProfileCard
            variant={isLoggedIn ? 'member' : 'guest'}
            startButtonProps={{ onClick: handleGoLogin }}
            myGitlogButtonProps={{ onClick: handleGoHome }}
            writeGitlogButtonProps={{ onClick: handleGoWrite }}
            logoutButtonProps={{ onClick: handleLogout }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default PageHeader;
