export const backdrop =
  "fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm";

export const wrapper = `
  relative flex flex-col md:flex-row
  bg-brand-black text-brand-white rounded-xl shadow-lg overflow-hidden
  w-[90%] max-w-[782px] md:h-[469px]
  transition-all duration-300
  items-center justify-center
  px-6 py-24 md:px-0 md:py-0
  gap-10 md:gap-0
`;

export const leftSection = `
  flex flex-col justify-center items-center gap-18
  text-center md:text-left
  md:flex-1 md:pl-14 md:pr-6
`;

export const title = `
  font-smooch text-3xl tracking-wide leading-none text-brand-white
`;

export const subtitle = `
  text-sm text-brand-gray mt-2
`;

export const rightSection = `
  flex flex-col justify-center items-center gap-3
  w-full md:w-[320px] md:flex-1 md:pr-14 md:pl-6
`;

export const inputGroup = `
  flex flex-col gap-3 w-full
`;

export const loginButton = `
  w-full bg-brand-blue text-brand-white rounded-md py-2 mt-1
  hover:bg-brand-blue/90 transition
`;

export const snsDivider = `
  flex items-center justify-center w-full text-xs text-brand-gray my-2
  before:content-[''] before:flex-1 before:h-[1px] before:bg-brand-lightGray/40
  after:content-[''] after:flex-1 after:h-[1px] after:bg-brand-lightGray/40
  gap-2
`;

export const kakaoButton = `
  w-full bg-brand-yellow text-brand-black rounded-md py-2 font-medium flex items-center justify-center gap-2
  hover:brightness-95 transition
`;

export const footer = `
  text-xs text-brand-gray mt-4
`;

export const closeButton = `
  absolute top-4 right-4 text-brand-white hover:text-brand-gray
`;

export const errorText = "text-brand-red text-xs";
