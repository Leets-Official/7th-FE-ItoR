import type { User } from "@/store/useUserStore";

type StoredMockUser = User & {
  password?: string;
  kakaoId?: number;
};

type RegisterPayload = {
  email: string;
  nickname: string;
  birthDate: string;
  name: string;
  profilePicture?: string;
  introduction?: string;
  password: string;
};

type RegisterOAuthPayload = {
  email: string;
  nickname: string;
  birthDate: string;
  name: string;
  profilePicture?: string;
  introduction?: string;
  kakaoId: number;
};

const MOCK_USERS_KEY = "mock-auth-users";
const MOCK_DELAY_MS = 250;

const DEFAULT_MOCK_USERS: StoredMockUser[] = [
  {
    id: 1,
    email: "tester@leets.land",
    password: "test1234",
    nickname: "tester",
    profilePicture: "",
    name: "Tester",
    birthDate: "2000-01-01",
    introduction: "Mock account",
    loginType: "email",
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sanitizeUser = ({ password: _password, kakaoId: _kakaoId, ...user }: StoredMockUser): User => user;

const readUsers = (): StoredMockUser[] => {
  const raw = localStorage.getItem(MOCK_USERS_KEY);
  if (!raw) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(DEFAULT_MOCK_USERS));
    return DEFAULT_MOCK_USERS;
  }

  try {
    const parsed = JSON.parse(raw) as StoredMockUser[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fall back to defaults if localStorage was manually edited.
  }

  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(DEFAULT_MOCK_USERS));
  return DEFAULT_MOCK_USERS;
};

const writeUsers = (users: StoredMockUser[]) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const createTokens = (userId: number) => ({
  accessToken: `mock-access-token-${userId}`,
  refreshToken: `mock-refresh-token-${userId}`,
});

export const mockLogin = async (email: string, password: string) => {
  await wait(MOCK_DELAY_MS);

  const user = readUsers().find((candidate) => candidate.email === email.trim());
  if (!user || user.password !== password) {
    throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  return {
    user: sanitizeUser(user),
    ...createTokens(user.id),
  };
};

export const mockRegister = async (payload: RegisterPayload) => {
  await wait(MOCK_DELAY_MS);

  const users = readUsers();
  if (users.some((user) => user.email === payload.email.trim())) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  if (users.some((user) => user.nickname === payload.nickname.trim())) {
    throw new Error("이미 사용 중인 닉네임입니다.");
  }

  const newUser: StoredMockUser = {
    id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    email: payload.email.trim(),
    password: payload.password,
    nickname: payload.nickname.trim(),
    profilePicture: payload.profilePicture?.trim() ?? "",
    name: payload.name.trim(),
    birthDate: payload.birthDate.trim(),
    introduction: payload.introduction?.trim() ?? "",
    loginType: "email",
  };

  writeUsers([...users, newUser]);

  return {
    code: 201,
    message: "Mock signup success",
    data: null,
  };
};

export const mockRegisterKakao = async (payload: RegisterOAuthPayload) => {
  await wait(MOCK_DELAY_MS);

  const users = readUsers();
  if (users.some((user) => user.email === payload.email.trim())) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  if (users.some((user) => user.nickname === payload.nickname.trim())) {
    throw new Error("이미 사용 중인 닉네임입니다.");
  }

  const newUser: StoredMockUser = {
    id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    email: payload.email.trim(),
    nickname: payload.nickname.trim(),
    profilePicture: payload.profilePicture?.trim() ?? "",
    name: payload.name.trim(),
    birthDate: payload.birthDate.trim(),
    introduction: payload.introduction?.trim() ?? "",
    loginType: "kakao",
    kakaoId: payload.kakaoId,
  };

  writeUsers([...users, newUser]);

  return {
    code: 201,
    message: "Mock signup success",
    data: null,
  };
};
