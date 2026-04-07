import type { ReactElement, SVGProps } from 'react';

type IconName =
  | 'search'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'edit'
  | 'check'
  | 'alert-circle'
  | 'heart'
  | 'calendar'
  | 'user';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const iconPaths: Record<IconName, ReactElement> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.35-4.35" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  'chevron-left': <path d="M14 6l-6 6 6 6" />,
  'chevron-right': <path d="M10 6l6 6-6 6" />,
  edit: <path d="M4 20h4l10-10-4-4L4 16v4zm8-12l4 4" />,
  check: <path d="M5 13l4 4L19 7" />,
  'alert-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  heart: <path d="M12 20s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 10c0 5.65-7 10-7 10z" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 9h16" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </>
  ),
};

export function Icon({ className = '', name, size = 18, strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}

export default Icon;
