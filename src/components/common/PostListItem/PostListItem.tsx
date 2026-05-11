import { Profile } from '@/components/common/Profile';
import { PictureFrame } from '@/components/common/PictureFrame';

import type { PostListItemProps } from './PostListItem.types';

export function PostListItem({
  title,
  description,
  nickname,
  date,
  commentCount,
  onClick,
  showThumbnail = true,
  thumbnailSrc,
  descriptionLines = 2,
}: PostListItemProps) {
  const descriptionClampStyle = descriptionLines === 1 ? { WebkitLineClamp: 1 } : { WebkitLineClamp: 2 };
  const contentWidthClass = showThumbnail ? 'w-[548px]' : 'w-[656px]';

  return (
    <article
      className={`flex h-[166px] w-[688px] items-start gap-4 bg-white px-4 py-3 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className={`flex h-[150px] ${contentWidthClass} flex-col`}>
        <div className="flex h-[106px] flex-col gap-2">
          <h3 className="text-base font-medium leading-[160%] tracking-[-0.08px] text-black">{title}</h3>

          <p
            className="h-12 overflow-hidden text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33"
            style={{
              ...descriptionClampStyle,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </p>
        </div>

        <div className="flex h-11 items-center py-3">
          <div className="flex h-5 items-center gap-3">
            <Profile size={2} className="h-5 w-5" />

            <div className="flex items-center gap-[6px] text-xs leading-[160%]">
              <span className="font-regular text-gray-20">{nickname}</span>
              <span className="h-[2px] w-[2px] rounded-full bg-gray-90" aria-hidden="true" />
              <span className="font-light text-gray-56">{date}</span>
              <span className="h-[2px] w-[2px] rounded-full bg-gray-90" aria-hidden="true" />
              <span className="font-light text-gray-56">댓글{commentCount}</span>
            </div>
          </div>
        </div>
      </div>

      {showThumbnail && (
        <PictureFrame size="small">
          {thumbnailSrc ? (
            <img src={thumbnailSrc} alt="게시물 썸네일" className="h-[92px] w-[92px] object-cover" />
          ) : (
            <div className="h-[92px] w-[92px] bg-gray-90" aria-hidden="true" />
          )}
        </PictureFrame>
      )}
    </article>
  );
}
