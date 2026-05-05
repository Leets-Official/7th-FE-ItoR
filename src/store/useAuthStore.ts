import { create } from 'zustand';
import type { UserData } from '@/api/user';

interface AuthState {
  user: UserData | null;
  isLoggedIn: boolean;
  setUser: (user: UserData | null) => void;
  logout: () => void;
  mockLogin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isLoggedIn: false });
  },

  mockLogin: () => {
    // Keep mock auth UI-only so refresh/reissue APIs are never called with fake JWT strings.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    set({
      user: {
        id: 1,
        email: 'user@example.com',
        nickname: '테스트유저',
        profilePicture: '',
        name: '테스트',
        birthDate: '2000-01-01',
        introduction: 'UI 개발용 계정입니다.',
      },
      isLoggedIn: true,
    });
  },
}));
