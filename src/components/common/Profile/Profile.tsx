import { Profile1Icon, Profile2Icon, Profile3Icon, Profile4Icon } from '@/assets/icons';

interface ProfileProps {
  size?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Profile({
  size = 1,
  className,
}: ProfileProps) {
  if (size === 1) return <Profile1Icon className={className} />;
  if (size === 2) return <Profile2Icon className={className} />;
  if (size === 3) return <Profile3Icon className={className} />;
  return <Profile4Icon className={className} />;
}
