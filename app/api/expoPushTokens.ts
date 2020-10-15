import client from './client';

const register = (pushToken: string) =>
  client.post('/member/expoPushToken', { token: pushToken });

export default { register };
