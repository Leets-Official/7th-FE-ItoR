import React from "react";

export type TextFieldVariant =
  | "default"
  | "input"
  | "active"
  | "disabled"
  | "borderless"
  | "backless";
export type TextFieldSize = "sm" | "md" | "lg";

export interface BaseTextFieldProps {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  fullWidth?: boolean;
}

export type InputTextFieldProps = BaseTextFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    multiline?: false;
  };

export type TextareaTextFieldProps = BaseTextFieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
    multiline: true;
  };

export type TextFieldProps = InputTextFieldProps | TextareaTextFieldProps;
