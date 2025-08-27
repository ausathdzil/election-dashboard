export type Article = {
  publish_date: string;
  id: number;
  url: string;
  author: string;
  article_text: string;
  title: string;
  main_image: string;
  province: string;
  city: string;
  latitude: number;
  longitude: number;
  search_vector: string;
  rank: number;
};

export type News = {
  data: Article[];
  count: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

export type NewsSource = {
  author: string;
  article_count: number;
};

export type ArticleTrend = {
  bucket: string;
  article_count: number;
};

export type ProvinceSummary = {
  province: string;
  article_count: number;
};

type GeoJSONGeometry = {
  type: string;
  coordinates: number[];
};

type Properties = {
  name: string;
  city: string;
  province: string;
  article_count: number;
};

export type Feature = {
  type: string;
  geometry: GeoJSONGeometry;
  properties: Properties;
};

export type CitySummary = {
  type: string;
  features: Feature[];
};
