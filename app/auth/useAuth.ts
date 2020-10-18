import { useContext } from 'react';

import AuthContext from './context';
import {
  storeToken,
  removeToken,
  storeRefreshToken,
  removeRefreshToken,
} from './storage';
import client from '../api/client';

export default function useAuth() {
  const { member, setMember } = useContext(AuthContext);

  const login = async (authToken: any, refreshToken: any) => {
    try {
      await storeToken(authToken);
      await storeRefreshToken(refreshToken);
      const { data } = await client.get('/member/self');
      if (setMember) setMember(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const logout = async () => {
    await removeToken();
    await removeRefreshToken();
    if (setMember) setMember(undefined);
  };

  return { member, setMember, login, logout };
}
