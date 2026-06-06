import type { ReactNode } from 'react';

export type PictureFrameSize = 'small' | 'big';

export interface PictureFrameProps {
  size: PictureFrameSize;
  children: ReactNode;
  className?: string;
}
