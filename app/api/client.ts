import axios from 'axios';
import { getToken } from '../auth/storage';

const instance = axios.create({
  baseURL: process.env.EXPO_API_URL,
  headers: {
    'api-token': process.env.EXPO_API_TOKEN,
  },
});

instance.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
