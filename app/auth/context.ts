import React from 'react';

import Member from 'interfaces/Member';

interface MemberContext {
  member: Member;
  setMember: React.Dispatch<React.SetStateAction<Member | undefined>>;
}

const AuthContext = React.createContext<Partial<MemberContext>>({});

export default AuthContext;
