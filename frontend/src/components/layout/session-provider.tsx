'use client';

import { createContext, use, useContext } from 'react';

import type { User } from '@/lib/types/user';

export type Session = {
  user: User | null;
  token: string;
};

const SessionContext = createContext<Session | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  return context;
}

export function SessionProvider({
  children,
  sessionPromise,
}: {
  children: React.ReactNode;
  sessionPromise: Promise<Session | null>;
}) {
  const session = use(sessionPromise);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
