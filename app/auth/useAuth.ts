import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import Member from '../interfaces/Member';
import { storeToken, removeToken } from './storage';

export default function useAuth() {
  const { member, setMember } = useContext(AuthContext);

  const login = (authToken: any) => {
    const storedMember: Member = jwtDecode(authToken);
    if (storedMember) {
      if (setMember) setMember(storedMember);
      storeToken(authToken);
    }
  };

  const logout = () => {
    removeToken();
    if (setMember) setMember(undefined);
  };

  return { member, setMember, login, logout };
}
