import PageHeaderLeft from '@/components/common/PageHeader/PageHeaderLeft';
import PageHeaderRight from '@/components/common/PageHeader/PageHeaderRight';
import { ProfileCard } from '@/components/common/ProfileCard';
import { cn } from '@/utils/cn';
import { isLoggedInUser } from '@/utils/auth';
import { clearAuthTokens } from '@/utils/tokenStorage';
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
  onCancelClick,
  onSubmitPost,
  cancelLabel,
  submitLabel,
  isSubmitDisabled,
  authStateOverride,
  canManagePost,
  isPostMenuOpen,
  onTogglePostMenu,
  onEditPost,
  onDeletePost,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);

  const isLoggedIn = useMemo(() => {
    if (authStateOverride) {
      return authStateOverride === 'member';
    }
    return isLoggedInUser();
  }, [authStateOverride]);

  useEffect(() => {
    if (!isProfileCardOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
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

  const navigateAndCloseProfileCard = (path: string) => {
    navigate(path);
    setIsProfileCardOpen(false);
  };

  const handleGoHome = () => {
    navigateAndCloseProfileCard('/main');
  };

  const handleGoMyPage = () => {
    navigateAndCloseProfileCard('/mypage');
  };

  const handleGoWrite = () => {
    navigateAndCloseProfileCard('/blog/write');
  };

  const handleGoSetting = () => {
    navigateAndCloseProfileCard('/signup/email?auth=member');
  };

  const handleGoLogin = () => {
    navigateAndCloseProfileCard('/login');
  };

  const handleLogout = () => {
    clearAuthTokens();
    navigate('/login');
    setIsProfileCardOpen(false);
  };

  return (
    <div ref={profileMenuRef} className="relative z-40">
      <header className={cn('flex h-[74px] w-full items-center justify-between bg-white px-4 py-3', className)}>
        <PageHeaderLeft onMenuClick={handleToggleProfileCard} onLogoClick={handleGoHome} />
        <PageHeaderRight
          type={type}
          onCommentClick={onCommentClick}
          onWriteClick={handleGoWrite}
          onCancelClick={onCancelClick}
          onSubmitPost={onSubmitPost}
          cancelLabel={cancelLabel}
          submitLabel={submitLabel}
          isSubmitDisabled={isSubmitDisabled}
          canManagePost={canManagePost}
          isPostMenuOpen={isPostMenuOpen}
          onTogglePostMenu={onTogglePostMenu}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
        />
      </header>

      {isProfileCardOpen ? (
        <div className="absolute top-0 left-0 z-50">
          <ProfileCard
            className="h-screen"
            variant={isLoggedIn ? 'member' : 'guest'}
            startButtonProps={{ onClick: handleGoLogin }}
            startButtonLabel="로그인하기"
            myGitlogButtonProps={{ onClick: handleGoMyPage }}
            writeGitlogButtonProps={{ onClick: handleGoWrite }}
            settingButtonProps={{ onClick: handleGoSetting }}
            logoutButtonProps={{ onClick: handleLogout }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default PageHeader;
