import api from "./index";
import { useUserStore } from "@/store/useUserStore";
import { mockFetchMyInfo, mockUpdateUserInfo } from "./mockData";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";

export const fetchMyInfo = async () => {
  if (USE_MOCK_AUTH) {
    return mockFetchMyInfo();
  }

  const res = await api.get("/users/me");
  const currentUser = useUserStore.getState().user;

  return {
    ...res.data,
    loginType: res.data.loginType ?? currentUser?.loginType ?? "email",
  };
};

export const updateUserInfo = async (payload: {
  email?: string;
  nickname?: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}) => {
  if (USE_MOCK_AUTH) {
    return mockUpdateUserInfo(payload);
  }

  const res = await api.patch("/users", payload);
  const currentUser = useUserStore.getState().user;

  return {
    ...res.data,
    loginType: res.data.loginType ?? currentUser?.loginType ?? "email",
  };
};
