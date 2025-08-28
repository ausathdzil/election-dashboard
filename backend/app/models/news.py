from datetime import datetime
from enum import Enum

from sqlmodel import Field, SQLModel


class NewsBase(SQLModel):
    title: str = Field(index=True)
    author: str | None = None
    publish_date: datetime | None = Field(index=True)
    article_text: str
    url: str | None = None
    main_image: str | None = None
    city: str | None = Field(index=True)
    province: str | None = Field(index=True)
    latitude: float | None = None
    longitude: float | None = None


class NewsWithRank(NewsBase):
    id: int | None
    rank: float | None = Field(default=0.0)


class NewsPublic(SQLModel):
    data: list[NewsWithRank]
    count: int
    page: int
    size: int
    total_pages: int
    has_next: bool
    has_prev: bool


class TopNewsSource(SQLModel):
    author: str
    article_count: int


class TopNewsSourcePublic(SQLModel):
    data: list[TopNewsSource]


class Granularity(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"


class NewsTrends(SQLModel):
    bucket: datetime
    article_count: int


class NewsTrendsPublic(SQLModel):
    data: list[NewsTrends]


class ProvinceSummary(SQLModel):
    province: str
    article_count: int


class ProvinceSummaryPublic(SQLModel):
    data: list[ProvinceSummary]


class GeoJSONGeometry(SQLModel):
    type: str = "Point"
    coordinates: list[float]


class CitySummaryProperties(SQLModel):
    city: str
    province: str
    article_count: int


class GeoJSONFeature(SQLModel):
    type: str = "Feature"
    geometry: GeoJSONGeometry
    properties: CitySummaryProperties


class GeoJSONFeatureCollection(SQLModel):
    type: str = "FeatureCollection"
    features: list[GeoJSONFeature]


class CitySummaryResult(SQLModel):
    city: str
    province: str
    latitude: float
    longitude: float
    article_count: int
