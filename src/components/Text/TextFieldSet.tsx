import React from "react";
import TextField from "./TextField";

interface TextFieldSetProps {
  title?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  helperText?: string;
  type?: string;
  variant?: "default" | "backless";
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const TextFieldSet: React.FC<TextFieldSetProps> = ({
  title,
  placeholder = "Text field",
  helperText,
  type = "text",
  size = "sm",
  error,
  variant = "default",
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {" "}
      {title && <label className="text-brand-gray text-sm">{title}</label>}
      <TextField
        placeholder={placeholder}
        size={size}
        variant={variant}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-500">* {error}</p>
      ) : (
        helperText && <p className="mt-1 text-xs text-gray-400">* {helperText}</p>
      )}
    </div>
  );
};

export default TextFieldSet;
