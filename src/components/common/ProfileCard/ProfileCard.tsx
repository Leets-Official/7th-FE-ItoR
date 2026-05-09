import { Button } from '@/components/common/Button';
import { Profile } from '@/components/common/Profile';
import type { ProfileCardProps } from '@/components/common/ProfileCard/ProfileCard.types';

export function ProfileCard({
  variant = 'guest',
  caption = 'You can make anything by writing',
  startButtonProps,
  nickname = '%{닉네임}',
  myGitlogButtonProps,
  writeGitlogButtonProps,
  settingButtonProps,
  logoutButtonProps,
}: ProfileCardProps) {
  if (variant === 'member') {
    return (
      <aside className="flex h-[768px] w-[240px] flex-col justify-between border-r border-gray-90 bg-gray-96">
        <div className="px-4 pt-6">
          <Profile size={1} className="h-16 w-16" />

          <div className="mt-3 flex flex-col gap-3">
            <p className="w-[200px] text-2xl font-medium leading-[160%] text-black">{nickname}</p>
            <p className="w-[200px] text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-20">{caption}</p>
          </div>

          <div className="mt-5 flex items-center gap-[10px]">
            <Button intent="primary" showIcon={false} {...myGitlogButtonProps}>
              나의 깃로그
            </Button>
            <Button intent="primary" showIcon={false} {...writeGitlogButtonProps}>
              깃로그 쓰기
            </Button>
          </div>
        </div>

        <div className="px-4 pb-6">
          <div className="flex items-center gap-[10px]">
            <Button intent="gray" showIcon={false} className="w-[99px]" {...settingButtonProps}>
              설정
            </Button>
            <Button intent="gray" showIcon={false} className="w-[99px]" {...logoutButtonProps}>
              로그아웃
            </Button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-[768px] w-[240px] border-r border-gray-90 bg-gray-96">
      <div className="border-b border-gray-90 px-4 pt-6">
        <Profile size={1} className="h-16 w-16" />

        <p className="mt-3 w-[200px] text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-20">
          {caption}
        </p>

        <div className="mt-5">
          <Button intent="primary" showIcon={false} {...startButtonProps}>
            깃로그 시작하기
          </Button>
        </div>

        <div className="h-16" aria-hidden="true" />
      </div>
    </aside>
  );
}
