import { useContext, useState } from 'react';

import {
  storeToken,
  removeToken,
  storeRefreshToken,
  removeRefreshToken,
} from './storage';
import { http } from 'api';
import { logger } from 'logging';

import React from 'react';

import Member from 'interfaces/Member';

interface MemberContext {
  member: Member;
  setMember: React.Dispatch<React.SetStateAction<Member | undefined>>;
}

const AuthContext = React.createContext<Partial<MemberContext>>({});

export const AuthContextProvider = ({ children }) => {
  const [member, setMember] = useState<Member>();

  return (
    <AuthContext.Provider value={{ member, setMember }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const { member, setMember } = useContext(AuthContext);

  const login = async (authToken: any, refreshToken: any) => {
    try {
      await storeToken(authToken);
      await storeRefreshToken(refreshToken);
      const res = await http.get('/member/self');
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
