import type { ImgHTMLAttributes } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'offline' | 'busy';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-lg',
};

const statusStyles: Record<AvatarStatus, string> = {
  online: 'bg-emerald-400',
  offline: 'bg-slate-300',
  busy: 'bg-rose-400',
};

function getInitials(name?: string) {
  if (!name) return '?';

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Avatar({ alt, className = '', name, size = 'md', src, status, ...props }: AvatarProps) {
  const initials = getInitials(name || alt);

  return (
    <span className="relative inline-flex shrink-0">
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? 'avatar'}
          className={[
            'rounded-full border border-white/80 object-cover shadow-sm',
            sizeStyles[size],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
      ) : (
        <span
          className={[
            'inline-flex items-center justify-center rounded-full bg-slate-900 font-semibold text-white shadow-sm',
            sizeStyles[size],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label={alt ?? name ?? 'avatar'}
        >
          {initials}
        </span>
      )}
      {status ? (
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white">
          <span className={['block h-full w-full rounded-full', statusStyles[status]].join(' ')} />
        </span>
      ) : null}
    </span>
  );
}

export default Avatar;
