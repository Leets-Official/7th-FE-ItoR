import React from "react";

export type SmallVariant = "secondaryOutline" | "disabled";

export interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: SmallVariant;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}
