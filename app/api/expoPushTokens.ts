import http from './http';

const register = (pushToken: string) =>
  http.post('/member/expoPushToken', { token: pushToken });

export default { register };
