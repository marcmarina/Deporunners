import axios from 'axios';
import { getRefreshToken, getToken, storeToken } from '../auth/storage';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'x-api-token': process.env.API_TOKEN,
  },
  timeout: 4000,
});

instance.interceptors.request.use(async config => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  config.headers = {
    ...config.headers,
    'x-auth-token': `${token}`,
    'x-refresh-token': `${refreshToken}`,
  };
  return config;
});

instance.interceptors.response.use(async config => {
  const returnedToken = config.headers['x-auth-token'];
  if (returnedToken && returnedToken !== getToken()) {
    await storeToken(returnedToken);
  }
  return config;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
