import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { getCurrentUser } from './data/user';

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('access_token');

  if (!cookie) {
    return null;
  }

  const user = await getCurrentUser(cookie.value);

  if (!user?.id) {
    return null;
  }

  return user;
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
}
