import React from "react";
import type { ButtonProps } from "./Button.types";
import { base, variants, disabledStyle, iconColors, sizes } from "./Button.styled";
import { cn } from "@/utils/cn";

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primaryOutline",
  size = "md",
  leftIcon,
  className = "",
  disabled,
  fullWidth,
  ...props
}) => {
  const cls = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full justify-center",
    disabled && disabledStyle,
    className,
  );

  const iconCls = cn("h-6 w-6 shrink-0", iconColors[variant], disabled && "text-gray-400");

  return (
    <button className={cls} disabled={disabled} {...props}>
      {leftIcon &&
        React.cloneElement(leftIcon, {
          className: cn(leftIcon.props.className, iconCls),
        })}
      <span>{label}</span>
    </button>
  );
};

export default Button;
