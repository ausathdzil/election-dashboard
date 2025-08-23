import type {
  GetArticleTrendsResponse,
  GetCitySummaryResponse,
  GetNewsResponse,
  GetProvinceSummaryResponse,
  GetTopNewsSourceResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GetNewsParams = {
  q: string | null;
  page: string | null;
  size: string | null;
};

export async function getNews(params: GetNewsParams): Promise<GetNewsResponse> {
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

  const response = await fetch(`${API_URL}/news?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();
  return data;
}

export async function getTopNewsSource(): Promise<GetTopNewsSourceResponse> {
  const response = await fetch(`${API_URL}/news/top-sources`);

  if (!response.ok) {
    throw new Error('Failed to fetch top news source');
  }

  const data = await response.json();
  return data;
}

type GetNewsTrendsParams = {
  start_date: string | null;
  end_date: string | null;
  granularity: string | null;
};

export async function getNewsTrends(
  params: GetNewsTrendsParams
): Promise<GetArticleTrendsResponse> {
  const searchParams = new URLSearchParams();
  if (params.start_date) {
    searchParams.set('start_date', params.start_date);
  }
  if (params.end_date) {
    searchParams.set('end_date', params.end_date);
  }
  if (params.granularity) {
    searchParams.set('granularity', params.granularity);
  }

  const response = await fetch(
    `${API_URL}/news/trends?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news trends');
  }

  const data = await response.json();
  return data;
}

export async function getProvinceGeojson() {
  const response = await fetch(`${API_URL}/geojson/province`);

  if (!response.ok) {
    throw new Error('Failed to fetch province geojson');
  }

  const data = await response.json();
  return data;
}

export async function getCityRegencyGeojson() {
  const response = await fetch(`${API_URL}/geojson/city-regency`);

  if (!response.ok) {
    throw new Error('Failed to fetch city regency geojson');
  }

  const data = await response.json();
  return data;
}

export async function getProvinceSummary(): Promise<GetProvinceSummaryResponse> {
  const response = await fetch(`${API_URL}/news/province-summary`);

  if (!response.ok) {
    throw new Error('Failed to fetch province summary');
  }

  const data = await response.json();
  return data;
}

type CitySummaryParams = {
  province: string;
};

export async function getCitySummary(
  params: CitySummaryParams
): Promise<GetCitySummaryResponse> {
  const searchParams = new URLSearchParams();
  if (params.province) {
    searchParams.set('province', params.province);
  }

  const response = await fetch(
    `${API_URL}/news/city-summary?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch city summary');
  }

  const data = await response.json();
  return data;
}
