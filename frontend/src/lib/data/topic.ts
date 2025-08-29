import { Topic } from '../types/topic';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GetTopicsParams = {
  q: string | null;
  owner_id: string | null;
};

export async function getTopics(
  params: GetTopicsParams,
  token: string
): Promise<{ data: Topic[]; count: number }> {
  const searchParams = new URLSearchParams();
  if (params.q) {
    searchParams.set('q', params.q);
  }
  if (params.owner_id) {
    searchParams.set('owner_id', params.owner_id);
  }

  console.log(`${API_URL}/topics?${searchParams.toString()}`);

  const response = await fetch(`${API_URL}/topics?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }

  const data = await response.json();
  return data;
}
