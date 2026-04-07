export const modalStyles = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4',
  panel: 'w-[326px] max-w-[326px] rounded-md bg-white px-4 pt-6 pb-4 shadow-modal',
  content: 'flex flex-col gap-6',
  textGroup: 'flex flex-col gap-2',
  title:
    'whitespace-pre-line text-[14px] font-regular leading-[22px] tracking-[-0.07px] text-black',
  description:
    'whitespace-pre-line text-[12px] font-regular leading-[19px] tracking-[0] text-gray-56',
  actionGroup: 'flex items-center gap-3',
  actionButton:
    'flex h-[38px] flex-1 items-center justify-center rounded-sm border text-sm font-regular leading-[160%] tracking-[-0.07px] transition-colors',
};

export const modalStyleMap = {
  actionTone: {
    cancel: 'border-gray-96 bg-white text-black',
    confirm: 'border-warning bg-warning text-white',
  },
  description: {
    withDescription: 'h-[192px]',
    withoutDescription: 'h-[146px]',
  },
};
