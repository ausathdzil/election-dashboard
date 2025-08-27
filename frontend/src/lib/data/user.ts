import type { User, Users } from '@/lib/types/user';

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

type GetUsersParams = {
  q: string | null;
  page: string | null;
  size: string | null;
};

export async function getUsers(
  accessToken: string,
  params: GetUsersParams
): Promise<Users> {
  const searchParams = new URLSearchParams();
  if (params.q) {
    searchParams.set('q', params.q);
  }
  if (params.page) {
    searchParams.set('page', params.page);
  }
  if (params.size) {
    searchParams.set('size', params.size);
  }

  const response = await fetch(`${API_URL}/users?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data;
}
