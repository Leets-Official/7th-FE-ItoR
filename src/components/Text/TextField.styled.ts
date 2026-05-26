import type { TextFieldVariant, TextFieldSize } from "./TextField.types";

export const base =
  "rounded-sm transition-colors duration-150 outline-none h-auto w-full bg-brand-white";

export const variants: Record<TextFieldVariant, string> = {
  default:
    "border border-brand-lightGray text-brand-black placeholder-brand-lightGray bg-brand-white focus:border-brand-blue",
  input:
    "border border-brand-lightGray text-brand-black placeholder-brand-black bg-brand-white focus:border-brand-blue",
  active:
    "border border-brand-gray text-brand-black placeholder-brand-black bg-brand-white focus:border-brand-blue",
  disabled:
    "border border-transparent text-brand-black placeholder-brand-gray bg-brand-lightGray cursor-not-allowed",
  borderless:
    "border-none text-brand-black placeholder-brand-lightGray bg-brand-white focus:border-none focus:ring-0",
  backless:
    "border border-brand-lightGray text-brand-black placeholder-brand-lightGray bg-transparent focus:border-brand-blue",
};

export const sizes: Record<TextFieldSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-4 py-3 text-lg",
};
