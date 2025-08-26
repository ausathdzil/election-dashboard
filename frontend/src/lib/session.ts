import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCurrentUser(accessToken: string | undefined) {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = await response.json();
  return data;
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('access_token');

  const user = await getCurrentUser(cookie?.value);

  if (!user.id) {
    redirect('/login');
  }

  return user;
});
