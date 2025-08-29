import type {
  Article,
  ArticleTrend,
  CitySummary,
  News,
  NewsSource,
  ProvinceSummary,
} from '../types/news';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GetNewsParams = {
  q: string | null;
  page: string | null;
  size: string | null;
  province: string | null;
  topic_id: string | null;
};

const MIN_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 20;

export async function getNews(params: GetNewsParams): Promise<News> {
  const searchParams = new URLSearchParams();
  if (params.q) {
    searchParams.set('q', params.q);
  }
  if (params.page) {
    if (Number(params.page) < 1) {
      searchParams.set('page', '1');
    }
    searchParams.set('page', params.page);
  }
  if (params.size) {
    if (
      Number(params.size) < MIN_PAGE_SIZE ||
      Number(params.size) > MAX_PAGE_SIZE
    ) {
      searchParams.set('size', MIN_PAGE_SIZE.toString());
    } else {
      searchParams.set('size', params.size);
    }
  }
  if (params.province) {
    searchParams.set('province', params.province);
  }
  if (params.topic_id) {
    searchParams.set('topic_id', params.topic_id);
  }

  const response = await fetch(`${API_URL}/news?${searchParams.toString()}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();
  return data;
}

type GetNewsByIdParams = {
  id: string;
};

export async function getNewsById(params: GetNewsByIdParams): Promise<Article> {
  const response = await fetch(`${API_URL}/news/${params.id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch news by id');
  }

  const data = await response.json();
  return data;
}

type GetTopNewsSourceParams = {
  province: string | null;
};

export async function getTopNewsSource(
  params: GetTopNewsSourceParams
): Promise<{ data: NewsSource[] }> {
  const searchParams = new URLSearchParams();
  if (params.province) {
    searchParams.set('province', params.province);
  }

  const response = await fetch(
    `${API_URL}/news/top-sources?${searchParams.toString()}`
  );

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
  province: string | null;
};

export async function getNewsTrends(
  params: GetNewsTrendsParams
): Promise<{ data: ArticleTrend[] }> {
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
  if (params.province) {
    searchParams.set('province', params.province);
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

export async function getProvinceSummary(): Promise<{
  data: ProvinceSummary[];
}> {
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
): Promise<CitySummary> {
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
