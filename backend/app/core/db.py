import pandas as pd
from app.core.config import settings
from app.crud.user import create_user
from app.models.schema import News, User
from app.models.user import UserCreate
from sqlmodel import Session, SQLModel, create_engine, select, text

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


def init_db(session: Session, seed_csv: str | None = None) -> None:
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        user = session.exec(
            select(User).where(User.email == settings.FIRST_SUPERUSER)
        ).first()
        if not user:
            user_in = UserCreate(
                email=settings.FIRST_SUPERUSER,
                password=settings.FIRST_SUPERUSER_PASSWORD,
                is_superuser=True,
            )
            user = create_user(session=session, user_create=user_in)

    if seed_csv:
        seed_db(seed_csv)

    with Session(engine) as session:
        session.exec(
            text(
                "CREATE INDEX IF NOT EXISTS idx_news_search_vector ON public.news USING GIN (search_vector);"
            )
        )
        session.commit()


def seed_db(csv_path: str | None = None) -> None:
    df = pd.read_csv(csv_path)
    df = df[["title", "author", "publish_date", "article_text", "url", "main_image"]]
    df["publish_date"] = pd.to_datetime(df["publish_date"], utc=True, errors="coerce")

    with Session(engine) as session:
        if session.exec(select(News)).first():
            print("Database already seeded")
            return
        news_item = [
            News(
                title=row["title"],
                author=row["author"] if pd.notna(row["author"]) else None,
                publish_date=row["publish_date"],
                article_text=row["article_text"],
                url=row["url"] if pd.notna(row["url"]) else None,
                main_image=row["main_image"] if pd.notna(row["main_image"]) else None,
            )
            for _, row in df.iterrows()
            if pd.notna(row["title"]) and pd.notna(row["article_text"])
        ]
        session.add_all(news_item)
        session.commit()
        print(f"✅ Seeded {len(news_item)} articles")
