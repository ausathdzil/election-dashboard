'use client';

import { createContext, use, useContext } from 'react';

import type { User } from '@/types/user';

const UserContext = createContext<User | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  return context;
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<User | null>;
}) {
  const user = use(userPromise);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
