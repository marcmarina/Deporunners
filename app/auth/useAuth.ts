import { useContext } from 'react';

import AuthContext from './context';
import {
  storeToken,
  removeToken,
  storeRefreshToken,
  removeRefreshToken,
} from './storage';
import client from 'api/client';
import logger from 'logging/logger';

export default function useAuth() {
  const { member, setMember } = useContext(AuthContext);

  const login = async (authToken: any, refreshToken: any) => {
    try {
      await storeToken(authToken);
      await storeRefreshToken(refreshToken);
      const res = await client.get('/member/self');
      if (res && setMember) {
        setMember(res.data);
      }
    } catch (ex) {
      logger.log(ex);
    }
  };

  const logout = async () => {
    await removeToken();
    await removeRefreshToken();
    if (setMember) setMember(undefined);
  };

  return { member, setMember, login, logout };
}
