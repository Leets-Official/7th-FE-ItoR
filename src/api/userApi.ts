import api from "./index";
import { useUserStore } from "@/store/useUserStore";

export const fetchMyInfo = async () => {
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
  const res = await api.patch("/users", payload);
  const currentUser = useUserStore.getState().user;

  return {
    ...res.data,
    loginType: res.data.loginType ?? currentUser?.loginType ?? "email",
  };
};
