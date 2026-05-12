import React from "react";

export type Variant =
  | "primaryOutline" // 파란 라인 + 흰 배경
  | "secondaryOutline" // 회색 라인 + 흰 배경
  | "tertiary" // 흰 배경 + 회색 텍스트
  | "neutral" // 옅은 회색 배경 + 회색 텍스트
  | "disabled" // 흐린 텍스트 + 연한 회색 배경
  | "inverse" // 검정 배경 + 흰 글자
  | "inverseMuted"; // 검정 배경 + 회색 글자

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Variant;
  size?: ButtonSize;
  leftIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  fullWidth?: boolean;
}
