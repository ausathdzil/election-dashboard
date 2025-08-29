import type { Topic } from '../types/topic';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GetTopicsParams = {
  q?: string;
  owner_id?: string;
  page?: string;
  size?: string;
};

export async function getTopics(
  params?: GetTopicsParams,
  token?: string | undefined
): Promise<{ data: Topic[]; count: number }> {
  const searchParams = new URLSearchParams();
  if (params?.q) {
    searchParams.set('q', params.q);
  }
  if (params?.owner_id) {
    searchParams.set('owner_id', params.owner_id);
  }
  if (params?.page) {
    searchParams.set('page', params.page);
  }
  if (params?.size) {
    searchParams.set('size', params.size);
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/topics?${searchParams.toString()}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }

  const data = await response.json();
  return data;
}

export async function getTopic(
  topic_id?: string,
  token?: string
): Promise<Topic | null> {
  if (!topic_id) {
    return null;
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/topics/${topic_id}`, { headers });

  if (!response.ok) {
    throw new Error('Failed to fetch topic');
  }

  const data = await response.json();
  return data;
}
