import axios from 'axios';
import { getToken } from '../auth/storage';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'api-token': process.env.API_TOKEN,
  },
  timeout: 4000,
});

instance.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(async config => {
  const token = await getToken();

  return config;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
