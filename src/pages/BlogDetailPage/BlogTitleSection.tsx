import { Profile } from '@/components/common/Profile';

interface BlogTitleSectionProps {
  title: string;
  author: string;
  dateText: string;
  commentCount: number;
}

export function BlogTitleSection({ title, author, dateText, commentCount }: BlogTitleSectionProps) {
  return (
    <section className="w-full border-b border-gray-90 bg-white">
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center">
        <div className="h-8 w-full max-w-[688px] md:h-16" aria-hidden="true" />
        <div className="flex w-full max-w-[688px] flex-col gap-3 py-3">
          <div className="flex items-center px-4 py-3">
            <h1 className="text-[44px] font-medium leading-[130%] tracking-[-0.2px] text-black md:text-[40px] md:leading-[160%]">
              {title}
            </h1>
          </div>
          <div className="h-3 md:h-8" aria-hidden="true" />
          <div className="flex h-11 items-center px-4 py-3">
            <div className="flex h-5 items-center gap-3">
              <Profile size={2} className="h-5 w-5" />
              <div className="flex items-center gap-[6px] text-xs leading-[160%]">
                <span className="font-regular text-gray-20">{author}</span>
                <span className="h-[2px] w-[2px] rounded-full bg-gray-90" aria-hidden="true" />
                <span className="font-light text-gray-56">{dateText}</span>
                <span className="h-[2px] w-[2px] rounded-full bg-gray-90" aria-hidden="true" />
                <span className="font-light text-gray-56">댓글{commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
