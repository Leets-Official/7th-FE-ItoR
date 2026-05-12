import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const syncAuthTokens = (accessToken: string | null, refreshToken: string | null) => {
  const { setAccessToken, setRefreshToken } = useAuthStore.getState();
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const clearAuthSession = () => {
  useAuthStore.getState().clearTokens();
  useUserStore.getState().clearUser();
  localStorage.removeItem("user-storage");
};

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken ?? localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken =
      useAuthStore.getState().refreshToken ?? localStorage.getItem("refreshToken");

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/reissue`,
          { refreshToken },
          { withCredentials: true },
        );

        const { accessToken, refreshToken: newRefresh } = res.data.data;
        syncAuthTokens(accessToken, newRefresh);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (e) {
        clearAuthSession();
        window.location.href = "/blog";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default api;

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
