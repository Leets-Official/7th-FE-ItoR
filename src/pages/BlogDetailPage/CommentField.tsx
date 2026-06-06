import { Profile } from '@/components/common/Profile';
import { useRef } from 'react';

export type CommentFieldVariant = 'loggedOut' | 'active' | 'writing';

interface CommentFieldProps {
  variant: CommentFieldVariant;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  onRequireLogin?: () => void;
}

export function CommentField({ variant, value = '', onChange, onSubmit, onRequireLogin }: CommentFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (variant === 'loggedOut') {
    return (
      <div className="flex w-full max-w-[688px] items-start px-4 py-3">
        <button
          type="button"
          onClick={onRequireLogin}
          className="flex min-h-[106px] w-full items-start rounded-[4px] border border-gray-90 bg-white px-4 py-3 text-left"
        >
          <span className="text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-33">
            로그인을 하고 댓글을 달아보세요!
          </span>
        </button>
      </div>
    );
  }

  const isWriting = variant === 'writing';

  const handleSubmit = () => {
    if (!value.trim()) {
      textareaRef.current?.focus();
      return;
    }
    onSubmit?.();
  };

  return (
    <div className="flex w-full max-w-[688px] items-start px-4 py-3">
      <div className="flex min-h-[228px] w-full flex-col rounded-[4px] border border-gray-90 bg-white py-2">
        <div className="flex h-[46px] w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-[6px]">
            <Profile size={2} className="h-[22px] w-[22px]" />
            <span className="text-sm font-light leading-[160%] tracking-[-0.5%] text-gray-20">닉네임</span>
          </div>
        </div>

        <div className="h-[112px] w-full px-4 py-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            spellCheck={false}
            placeholder="댓글을 입력하세요."
            className="h-[88px] w-full resize-none border-none bg-transparent text-sm font-light leading-[160%] tracking-[-0.5%] text-gray-56 outline-none placeholder:font-light placeholder:tracking-[-0.5%] placeholder:text-gray-56"
          />
        </div>

        <div className="mx-4 h-px w-[calc(100%-32px)] bg-gray-96" aria-hidden="true" />

        <div className="flex h-[54px] w-full items-center justify-end px-4 py-2">
          <button
            type="button"
            onClick={handleSubmit}
            className={
              isWriting
                ? 'h-[38px] w-16 rounded-[25px] border border-black bg-black px-3 py-2 text-sm font-regular leading-[160%] tracking-[-0.07px] text-white'
                : 'h-[38px] w-16 rounded-[25px] border border-gray-56 bg-white px-3 py-2 text-sm font-regular leading-[160%] tracking-[-0.07px] text-gray-56'
            }
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
