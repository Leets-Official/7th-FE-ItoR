import type { FallbackProps } from 'react-error-boundary';

export const FetchErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className='flex min-h-[24rem] flex-col items-center justify-center gap-[0.8rem] rounded-[1.6rem] border border-dashed border-[#dddddd] bg-[#fafafa] px-[2rem] py-[4rem] text-center'>
      <strong className='text-[1.8rem] font-semibold text-[#111111]'>
        요청을 불러오지 못했습니다.
      </strong>
      <p className='text-[1.4rem] leading-[1.6] text-[#777777]'>
        {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
      </p>
    </div>
  );
};
