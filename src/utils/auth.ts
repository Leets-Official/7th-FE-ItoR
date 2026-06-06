import { getAccessToken } from '@/utils/tokenStorage';

const DEV_FORCE_LOGIN_FLAG = 'itor_dev_force_login';

export function isDevForceLoginEnabled() {
  return localStorage.getItem(DEV_FORCE_LOGIN_FLAG) === 'true';
}

export function isLoggedInUser() {
  return Boolean(getAccessToken()) || isDevForceLoginEnabled();
}
