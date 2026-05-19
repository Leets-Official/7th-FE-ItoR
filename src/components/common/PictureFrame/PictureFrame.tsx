import type { PictureFrameProps } from './PictureFrame.types';

export function PictureFrame({ size, children, className = '' }: PictureFrameProps) {
  const frameClassName =
    size === 'small'
      ? 'h-[116px] w-[124px] bg-white px-4 py-3'
      : 'w-full rounded-[4px] bg-white';

  return <div className={`${frameClassName} ${className}`.trim()}>{children}</div>;
}
