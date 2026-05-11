export const modalStyles = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-[#B6B6B6]/30 p-4 backdrop-blur-[4px]',
  panel: 'w-[326px] max-w-[326px] rounded-[4px] bg-white px-4 pt-6 pb-4 shadow-modal',
  content: 'flex flex-col gap-6',
  textGroup: 'flex flex-col gap-0 px-1',
  title:
    'whitespace-pre-line text-[14px] font-regular leading-[160%] tracking-[-0.07px] text-black',
  description:
    'whitespace-pre-line text-[12px] font-regular leading-[19px] tracking-[0] text-gray-56',
  actionGroup: 'flex items-center gap-3',
  actionButton:
    'flex h-[38px] flex-1 items-center justify-center rounded-[2px] border text-sm font-regular leading-[160%] tracking-[-0.07px] transition-colors',
};

export const modalStyleMap = {
  actionTone: {
    cancel: 'border-gray-96 bg-white text-black',
    confirm: 'border-warning bg-warning text-white',
    primary: 'border-primary bg-primary text-white',
  },
  description: {
    withDescription: 'h-[192px]',
    withoutDescription: 'h-[124px]',
  },
};
