from datetime import datetime, timezone

from app.models.news import NewsBase
from app.models.topic import TopicBase
from app.models.user import UserBase
from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlmodel import Column, Computed, Field, Relationship, SQLModel, text


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    topics: list["Topic"] = Relationship(back_populates="owner", cascade_delete=True)


class News(NewsBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    search_vector: str | None = Field(
        sa_column=Column(
            TSVECTOR,
            Computed(
                text(
                    "setweight(to_tsvector('indonesian', coalesce(title, '')), 'A') ||"
                    "setweight(to_tsvector('indonesian', coalesce(article_text, '')), 'B')"
                ),
                persisted=True,
            ),
        )
    )


class Topic(TopicBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    owner_id: int | None = Field(
        default=None, foreign_key="user.id", ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="topics")
