import type { FC } from "react";
import type { DropdownMenuItem } from "./DropdownMenu.types";
import { baseMenu, bubbleArrow, menuItem } from "./DropdownMenu.styled";
import { cn } from "@/utils/cn";

interface DropdownMenuListProps {
  items: DropdownMenuItem[];
  onItemClick: (item: DropdownMenuItem) => void;
  position: "left" | "right";
  menuClassName?: string;
}

const DropdownMenuList: FC<DropdownMenuListProps> = ({
  items,
  onItemClick,
  position,
  menuClassName = "",
}) => {
  return (
    <div className={cn(baseMenu, position === "right" ? "right-0" : "left-0", menuClassName)}>
      <div className={bubbleArrow}></div>

      <ul className="flex flex-col items-center justify-center">
        {items.map((item, idx) => (
          <li
            key={idx}
            onClick={() => !item.disabled && onItemClick(item)}
            className={cn(
              menuItem,
              "flex h-full w-full items-center justify-center",
              item.disabled && "cursor-not-allowed opacity-50",
              !item.icon &&
                item.label === "삭제하기" &&
                "text-brand-red hover:text-brand-red hover:bg-red-50",
            )}
          >
            {item.icon ? item.icon : item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenuList;
