import { PictureFrame } from '@/components/common/PictureFrame';
import type { PostContentRequest } from '@/api/post';

interface BlogDetailBodySectionProps {
  content: string;
  contents?: PostContentRequest[];
}

const FALLBACK_CONTENT = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and
scrambled it to make a type specimen book.`;

export function BlogDetailBodySection({ content, contents }: BlogDetailBodySectionProps) {
  const hasApiContents = Boolean(contents && contents.length > 0);
  const orderedContents = hasApiContents ? [...(contents ?? [])].sort((a, b) => a.contentOrder - b.contentOrder) : [];

  return (
    <section className="w-full border-b border-gray-90 bg-white">
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="mx-auto w-full max-w-[688px]">
          <div className="h-5 md:h-8" aria-hidden="true" />
          {hasApiContents ? (
            orderedContents.map((item) => (
              <div key={`${item.contentType}-${item.contentOrder}`} className="w-full px-4 py-3">
                {item.contentType === 'TEXT' ? (
                  <p className="w-full whitespace-pre-wrap text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">{item.content}</p>
                ) : (
                  <PictureFrame size="big">
                    <img src={item.content} alt="게시글 이미지" className="h-auto w-full rounded-[4px] object-cover" />
                  </PictureFrame>
                )}
              </div>
            ))
          ) : (
            <div className="w-full px-4 py-3">
              <p className="w-full text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">{content || FALLBACK_CONTENT}</p>
            </div>
          )}
          <div className="h-8" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
