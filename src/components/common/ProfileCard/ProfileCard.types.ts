import type { ButtonHTMLAttributes } from 'react';

export type ProfileCardVariant = 'guest' | 'member';

export interface ProfileCardProps {
  className?: string;
  variant?: ProfileCardVariant;
  caption?: string;
  startButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  startButtonLabel?: string;
  nickname?: string;
  myGitlogButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  writeGitlogButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  settingButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  logoutButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}
