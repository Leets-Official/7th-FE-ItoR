import clsx from 'clsx';
import type { RefObject } from 'react';

import { dropdownStyles } from './Dropdown.styles';

export interface DropdownProps {
  label: string;
  value: string;
  options: readonly string[];
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement>;
  error?: boolean;
  helperText?: string;
  className?: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

export function Dropdown({
  label,
  value,
  options,
  isOpen,
  dropdownRef,
  error = false,
  helperText,
  className,
  onToggle,
  onSelect,
}: DropdownProps) {
  const visibleOptions = value
    ? options.filter((option) => option !== value)
    : options;

  return (
    <div ref={dropdownRef} className={clsx('relative flex flex-col gap-2', className)}>
      <span className="text-sm font-regular leading-[22px] tracking-[-0.07px] text-black">{label}</span>
      <div className={dropdownStyles.surface}>
        <span aria-hidden="true" className={dropdownStyles.arrow} />
        <div className={clsx(dropdownStyles.root, error && 'ring-1 ring-warning')}>
          <button
            type="button"
            className={clsx(dropdownStyles.item, dropdownStyles.trigger)}
            onClick={onToggle}
          >
            {value || `${label}를 선택해 주세요`}
          </button>
          {isOpen && visibleOptions.length > 0
            ? visibleOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={dropdownStyles.item}
              >
                {option}
              </button>
            ))
            : null}
        </div>
      </div>
      {helperText ? (
        <span className={clsx('text-xs leading-[19px] text-gray-56', error && 'text-warning')}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
