import React from "react";
import { cn } from "@/utils/cn";
import type { TextFieldProps } from "./TextField.types";
import { base, variants, sizes } from "./TextField.styled";

export const TextField: React.FC<TextFieldProps> = ({
  variant = "default",
  size = "md",
  className = "",
  disabled,
  fullWidth,
  multiline,
  ...props
}) => {
  const cls = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    multiline && "min-h-[180px] resize-none p-4",
    className,
  );

  if (multiline) {
    const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    return <textarea className={cls} disabled={disabled} {...textareaProps} />;
  }

  const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
  return <input className={cls} disabled={disabled} {...inputProps} />;
};

export default TextField;
