import defaultAvatarUrl from "@/assets/default-avatar.svg?url";
import type { AvatarProps, AvatarSize } from "./Avatar.types";

const sizeClassMap: Record<AvatarSize, string> = {
  xs: "w-avatar-xs h-avatar-xs",
  sm: "w-avatar-sm h-avatar-sm",
  md: "w-avatar-md h-avatar-md",
  lg: "w-avatar-lg h-avatar-lg",
  xl: "w-avatar-xl h-avatar-xl",
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = "md", className = "" }) => {
  const avatarSrc = src || defaultAvatarUrl;

  return (
    <div
      className={`bg-brand-bgGray flex shrink-0 items-center justify-center overflow-hidden rounded-full ${sizeClassMap[size]} ${className}`}
    >
      <img src={avatarSrc} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default Avatar;
