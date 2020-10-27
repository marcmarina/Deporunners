import axios from 'axios';

import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  storeToken,
} from 'auth/storage';

import env from 'config/env';

const instance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'x-api-token': env.API_TOKEN,
  },
  timeout: 4000,
});

instance.interceptors.request.use(async request => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  request.headers = {
    ...request.headers,
    'x-auth-token': `${token}`,
    'x-refresh-token': `${refreshToken}`,
  };
  return request;
});

instance.interceptors.response.use(async response => {
  if (response.status === 401) {
    removeRefreshToken();
    removeToken();
  }
  const returnedToken = response.headers['x-auth-token'];
  if (returnedToken && returnedToken !== (await getToken())) {
    await storeToken(returnedToken);
  }
  return response;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
