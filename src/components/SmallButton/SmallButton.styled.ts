import type { SmallVariant } from "./SmallButton.types";

export const base =
  "inline-flex items-center gap-2 px-2 py-1 text-[12px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer";

export const variants: Record<SmallVariant, string> = {
  secondaryOutline:
    "border border-transparent text-brand-gray bg-transparent hover:bg-brand-lightGray",
  disabled: "border border-transparent text-brand-gray bg-brand-lightGray",
};

export const disabledStyle = "cursor-not-allowed opacity-60";
