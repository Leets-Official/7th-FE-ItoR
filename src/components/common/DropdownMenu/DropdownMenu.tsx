import clsx from 'clsx';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';

import { dropdownMenuBaseStyle } from './variants';

export interface DropdownMenuItem {
  id: string;
  label: string;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'>;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  items: DropdownMenuItem[];
  defaultSelectedId?: string;
  onItemSelect?: (item: DropdownMenuItem) => void;
  onItemClick?: MouseEventHandler<HTMLButtonElement>;
}

export function DropdownMenu({
  className,
  items,
  defaultSelectedId,
  onItemSelect,
  onItemClick,
  ...props
}: DropdownMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const initialSelectedItem = useMemo(() => {
    if (items.length === 0) {
      return null;
    }

    return items.find((item) => item.id === defaultSelectedId) ?? items[0];
  }, [defaultSelectedId, items]);

  const [selectedItem, setSelectedItem] = useState<DropdownMenuItem | null>(
    initialSelectedItem,
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  if (items.length === 0 || !selectedItem) {
    return null;
  }

  const visibleItems = isOpen ? items : [selectedItem];

  return (
    <div
      ref={rootRef}
      className={clsx(dropdownMenuBaseStyle.root, className)}
      role="menu"
      {...props}
    >
      <span aria-hidden="true" className={dropdownMenuBaseStyle.arrow} />
      {visibleItems.map((item, index) => {
        const { onClick: itemOnClick, ...restButtonProps } = item.buttonProps ?? {};
        const isTrigger = !isOpen && index === 0;

        return (
          <button
            key={item.id}
            type="button"
            className={clsx(
              dropdownMenuBaseStyle.item,
              isTrigger && dropdownMenuBaseStyle.trigger,
            )}
            role="menuitem"
            aria-expanded={isTrigger ? isOpen : undefined}
            onClick={(event) => {
              onItemClick?.(event);
              itemOnClick?.(event);

              if (isTrigger) {
                setIsOpen(true);
                return;
              }

              setSelectedItem(item);
              setIsOpen(false);
              onItemSelect?.(item);
            }}
            {...restButtonProps}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
