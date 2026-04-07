import type { ReactNode } from 'react';

import { Avatar } from '../common/Avartar';
import { Button } from '../common/Button';

interface SidebarAction {
  label: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'status-error'
    | 'status-success'
    | 'cta-outline'
    | 'cta-outline-muted'
    | 'cta-solid-muted'
    | 'cta-solid-light'
    | 'cta-solid-dark'
    | 'text-muted'
    | 'surface-muted';
}

interface SidebarProps {
  mode?: 'brand' | 'profile';
  title: string;
  subtitle?: string;
  description?: string;
  actions?: SidebarAction[];
  footerActions?: SidebarAction[];
  children?: ReactNode;
}

function SidebarLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-3xl font-black italic text-white">
      g
    </div>
  );
}

export function Sidebar({
  actions = [],
  children,
  description,
  footerActions = [],
  mode = 'brand',
  subtitle,
  title,
}: SidebarProps) {
  return (
    <aside className="flex min-h-[640px] w-full max-w-[230px] flex-col rounded-none bg-[#f8f8f7] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12)]">
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="mb-5">
          {mode === 'profile' ? <Avatar name={title} size="lg" className="bg-[#111111]" /> : <SidebarLogo />}
        </div>

        <div className="space-y-2">
          <h2 className="text-[14px] font-semibold leading-6 text-[#2c2c2c]">{title}</h2>
          {subtitle ? <p className="text-[13px] leading-5 text-[#7c7c7c]">{subtitle}</p> : null}
          {description ? <p className="text-[13px] leading-6 text-[#6d6d6d]">{description}</p> : null}
        </div>

        {actions.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant ?? 'cta-outline'}
                className="h-9 rounded-full px-4 text-[13px] font-medium"
              >
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex-1 px-6 py-6">{children}</div>

      {footerActions.length ? (
        <div className="mt-auto flex gap-2 px-6 py-5">
          {footerActions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? 'cta-outline-muted'}
              className="h-9 flex-1 rounded-full px-3 text-[13px] font-medium"
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

export default Sidebar;
