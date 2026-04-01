import ky from 'ky';
import { clearAccessToken, getAccessToken } from './auth';
import { API_PREFIX_URL, API_TIMEOUT } from './constants';

export const api = ky.create({
  prefixUrl: API_PREFIX_URL,
  timeout: API_TIMEOUT,
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Accept', 'application/json');

        const accessToken = getAccessToken();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          clearAccessToken();
        }
      },
    ],
  },
});
