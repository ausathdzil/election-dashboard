import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCurrentUser(
  accessToken: string | undefined
): Promise<User | null> {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('access_token');

  if (!cookie) {
    return null;
  }

  const user = await getCurrentUser(cookie.value);

  if (!user || !user.id) {
    return null;
  }

  return user;
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
}
