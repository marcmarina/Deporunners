import axios from 'axios';

import { getRefreshToken, getToken, storeToken } from 'auth/storage';

import env from 'config/env';
import { DeviceEventEmitter } from 'react-native';

const cancelTokenSource = axios.CancelToken.source();

const instance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'x-api-token': env.API_TOKEN,
  },
  timeout: 4000,
  cancelToken: cancelTokenSource.token,
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

instance.interceptors.response.use(
  async response => {
    const returnedToken = response.headers['x-auth-token'];
    if (returnedToken && returnedToken !== (await getToken())) {
      await storeToken(returnedToken);
    }
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      return DeviceEventEmitter.emit('userUnauthorized');
    }
    return Promise.reject(error);
  }
);

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
