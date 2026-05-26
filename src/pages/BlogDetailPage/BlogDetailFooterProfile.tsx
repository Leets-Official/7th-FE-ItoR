import { Profile } from '@/components/common/Profile';

export function BlogDetailFooterProfile() {
  return (
    <section className="w-full border-b border-gray-90 bg-gray-96">
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="mx-auto w-full max-w-[688px]">
          <div className="h-12 md:h-16" aria-hidden="true" />
          <div className="flex w-full flex-col gap-[10px] px-4 py-3">
            <Profile size={2} className="h-16 w-16" />
            <div className="flex w-full flex-col gap-3 px-4 py-3">
              <span className="text-[44px] font-medium leading-[130%] tracking-[0] text-black md:text-2xl md:leading-[160%]">%{'{닉네임}'}</span>
              <span className="text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">%{'{한 줄 소개}'}</span>
            </div>
          </div>
          <div className="h-12 md:h-16" aria-hidden="true" />
          <div className="h-8 md:h-[42px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
