import { AddPhotoAlternateIcon } from '@/assets/icons';
import DeleteForeverSvg from '@/assets/icons/common/delete_forever.svg?react';
import type { ChangeEvent, RefObject } from 'react';
import type { WriteImageItem } from './useBlogWriteState';

interface BlogWriteEditorProps {
  isLoadingPost: boolean;
  title: string;
  content: string;
  images: WriteImageItem[];
  selectedImageId: number | null;
  fileInputRef: RefObject<HTMLInputElement>;
  imageSectionRef: RefObject<HTMLDivElement>;
  contentTextareaRef: RefObject<HTMLTextAreaElement>;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectImageCard: (imageId: number) => void;
  onDeleteImage: (imageId: number) => void;
}

export function BlogWriteEditor({
  isLoadingPost,
  title,
  content,
  images,
  selectedImageId,
  fileInputRef,
  imageSectionRef,
  contentTextareaRef,
  onChangeTitle,
  onChangeContent,
  onSelectImage,
  onSelectImageCard,
  onDeleteImage,
}: BlogWriteEditorProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1366px] flex-col bg-white">
      {isLoadingPost ? <div className="border-b border-gray-96 px-4 py-3 text-sm text-gray-56">게시물을 불러오는 중입니다.</div> : null}
      <section className="flex h-[49px] items-center justify-center border-b border-gray-96 px-3 py-[12px]">
        <button type="button" className="inline-flex h-[25px] items-center gap-1 px-2 py-[2px] text-xs text-gray-56" onClick={() => fileInputRef.current?.click()}>
          <AddPhotoAlternateIcon className="h-3 w-3 shrink-0 text-gray-56 [&_*]:fill-current [&_*]:stroke-current" />사진 추가하기
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onSelectImage} />
      </section>
      <section className="flex h-[110px] items-center justify-center border-b border-gray-96 bg-white px-3">
        <div className="flex h-[50px] w-full max-w-[688px] items-center gap-2 px-4 py-3">
          <input
            value={title}
            onChange={(event) => onChangeTitle(event.target.value)}
            placeholder="제목"
            className={`w-full bg-transparent outline-none ${title.trim() ? 'text-2xl font-medium text-black' : 'text-base font-medium text-gray-56 placeholder:text-gray-56'}`}
          />
        </div>
      </section>
      <section className="flex items-start justify-center bg-white px-3 pt-3 pb-0">
        <div className="flex w-full max-w-[688px] items-start gap-[10px] px-4 py-3">
          <textarea
            ref={contentTextareaRef}
            value={content}
            onChange={(event) => onChangeContent(event.target.value)}
            placeholder="어떠한 것을 깨달았나요?"
            onInput={(event) => {
              const target = event.currentTarget;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
            className={`w-full resize-none overflow-hidden bg-transparent outline-none ${content.trim() ? 'min-h-[22px] text-sm text-gray-20' : 'h-[22px] text-sm text-gray-56 placeholder:text-gray-56'}`}
          />
        </div>
      </section>
      <section ref={imageSectionRef} className="flex flex-1 flex-col items-center bg-white px-0 pb-8">
        {images.map((image) => {
          const isSelected = image.id === selectedImageId;
          return (
            <div key={image.id} className="relative mt-4 w-full max-w-[688px] px-0">
              {isSelected ? (
                <button
                  type="button"
                  className="absolute top-[-64px] left-1/2 z-10 flex h-12 w-[72px] -translate-x-1/2 items-center justify-center rounded-[4px] bg-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteImage(image.id);
                  }}
                >
                  <DeleteForeverSvg className="h-6 w-6 text-[#323232] [&_*]:fill-current [&_*]:stroke-current" />
                </button>
              ) : null}
              <button type="button" onClick={() => onSelectImageCard(image.id)} className={`block w-full overflow-hidden border ${isSelected ? 'border-[#00A1FF]' : 'border-gray-90'}`}>
                <img src={image.previewUrl} alt={image.name} className="block h-auto w-full object-cover" />
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}
