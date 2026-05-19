const DEFAULT_API_BASE_URL = "https://blog.leets.land";
const DEV_API_BASE_URL = "/api";

export const API_BASE_URL = import.meta.env.DEV
  ? DEV_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
