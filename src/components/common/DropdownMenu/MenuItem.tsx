import { cn } from '@/utils/cn';

import { dropdownStyles } from './Dropdown.styles';

interface MenuItemProps {
  label: string;
  isTrigger?: boolean;
  onClick: () => void;
}

export function MenuItem({
  label,
  isTrigger = false,
  onClick,
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(dropdownStyles.item, isTrigger && dropdownStyles.trigger)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
