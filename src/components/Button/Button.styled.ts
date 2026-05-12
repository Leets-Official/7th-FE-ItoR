import type { Variant } from "./Button.types";

export const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer";

export const variants: Record<Variant, string> = {
  primaryOutline: "border border-brand-blue text-brand-blue bg-white",
  secondaryOutline: "border border-brand-gray text-brand-gray bg-white",
  tertiary: "border border-transparent text-brand-gray bg-white",
  neutral: "border border-brand-gray text-brand-gray bg-brand-lightGray",
  disabled: "border border-brand-gray text-brand-gray bg-transparent",
  inverse: "border border-transparent text-white bg-brand-black",
  inverseMuted: "border border-transparent text-brand-gray bg-brand-black",
};

export const sizes = {
  xs: "px-1.5 py-0.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

export const iconColors: Record<string, string> = {
  primaryOutline: "text-brand-blue",
  secondaryOutline: "text-brand-gray",
  tertiary: "text-brand-gray",
  neutral: "text-brand-gray",
  disabled: "text-brand-gray",
  inverse: "text-white",
  inverseMuted: "text-brand-gray",
};

export const disabledStyle = "cursor-not-allowed";
