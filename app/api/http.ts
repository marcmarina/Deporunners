import axios from 'axios';

import { getRefreshToken, getToken, storeToken } from 'auth/storage';

import { env } from 'config';

const cancelTokenSource = axios.CancelToken.source();

const instance = axios.create({
  baseURL: env().API_URL,
  headers: {
    'x-api-token': env().API_TOKEN,
  },
  timeout: 4000,
  cancelToken: cancelTokenSource.token,
});

instance.interceptors.request.use(async (request) => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  request.headers = {
    ...request.headers,
    'x-auth-token': `${token}`,
    'x-refresh-token': `${refreshToken}`,
  };
  return request;
});

instance.interceptors.response.use(async (response) => {
  const storedToken = await getToken();
  const returnedToken = response.headers['x-auth-token'];
  if (returnedToken && returnedToken !== storedToken) {
    await storeToken(returnedToken);
  }
  return response;
});

export default instance;
