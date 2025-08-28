from datetime import datetime

from app.models.news import NewsBase
from sqlmodel import Field, SQLModel


class TopicBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    is_public: bool = False


class TopicCreate(TopicBase):
    pass


class TopicUpdate(TopicBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    is_public: bool | None = Field(default=None)


class TopicPublic(TopicBase):
    id: int
    owner_id: int
    created_at: datetime
    news: list[NewsBase]


class TopicsPublic(SQLModel):
    data: list[TopicPublic]
    count: int
    # page: int
    # size: int
    # total_pages: int
    # has_next: bool
    # has_prev: bool
