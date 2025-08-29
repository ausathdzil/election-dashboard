import math
from datetime import datetime, timedelta
from typing import Annotated

from app.api.deps import SessionDep
from app.models.news import (
    CitySummaryProperties,
    CitySummaryResult,
    GeoJSONFeature,
    GeoJSONFeatureCollection,
    GeoJSONGeometry,
    Granularity,
    NewsPublic,
    NewsTrendsPublic,
    NewsWithRank,
    ProvinceSummaryPublic,
    TopNewsSourcePublic,
)
from app.models.schema import News, Topic
from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, HTTPException, Query, status
from sqlmodel import func, literal_column, select, text

router = APIRouter(prefix="/news", tags=["news"])


@router.get("/", response_model=NewsPublic)
def get_news(
    session: SessionDep,
    q: Annotated[str | None, Query(max_length=50)] = None,
    page: Annotated[int | None, Query(ge=1)] = 1,
    size: Annotated[int | None, Query(ge=6, le=20)] = 6,
    province: str | None = None,
    topic_id: Annotated[int | None, Query(ge=1)] = None,
):
    tags_query: str | None = None
    if topic_id is not None:
        topic = session.get(Topic, topic_id)
        if topic is None:
            raise HTTPException(status_code=404, detail="Topic not found")
        tags = sorted({t for t in topic.tags if t})
        if tags:
            tags_query = " | ".join(tags)

    filters = [News.province == province] if province else []
    count_statement = select(func.count(News.id))
    if filters:
        count_statement = count_statement.where(*filters)
    data_statement = select(News)
    if filters:
        data_statement = data_statement.where(*filters)
    data_statement = data_statement.order_by(News.publish_date.desc())

    if q and tags_query:
        data_statement = select(
            News,
            text(
                "ts_rank_cd(news.search_vector, plainto_tsquery('indonesian', :q_param)) + "
                "ts_rank_cd(news.search_vector, to_tsquery('indonesian', :tags_param)) as rank"
            ).bindparams(q_param=q, tags_param=tags_query),
        )
        if filters:
            data_statement = data_statement.where(*filters)
        data_statement = data_statement.where(
            text(
                "news.search_vector @@ plainto_tsquery('indonesian', :q_param)"
            ).bindparams(q_param=q),
            text(
                "news.search_vector @@ to_tsquery('indonesian', :tags_param)"
            ).bindparams(tags_param=tags_query),
        ).order_by(literal_column("rank").desc(), News.publish_date.desc())
        count_statement = count_statement.where(
            text(
                "news.search_vector @@ plainto_tsquery('indonesian', :q_param)"
            ).bindparams(q_param=q),
            text(
                "news.search_vector @@ to_tsquery('indonesian', :tags_param)"
            ).bindparams(tags_param=tags_query),
        )
    elif q:
        data_statement = select(
            News,
            text(
                "ts_rank_cd(news.search_vector, plainto_tsquery('indonesian', :q_param)) as rank"
            ).bindparams(q_param=q),
        )
        if filters:
            data_statement = data_statement.where(*filters)
        data_statement = data_statement.where(
            text(
                "news.search_vector @@ plainto_tsquery('indonesian', :q_param)"
            ).bindparams(q_param=q),
        ).order_by(literal_column("rank").desc(), News.publish_date.desc())
        count_statement = count_statement.where(
            text(
                "news.search_vector @@ plainto_tsquery('indonesian', :q_param)"
            ).bindparams(q_param=q),
        )
    elif tags_query:
        data_statement = select(
            News,
            text(
                "ts_rank_cd(news.search_vector, to_tsquery('indonesian', :tags_param)) as rank"
            ).bindparams(tags_param=tags_query),
        )
        if filters:
            data_statement = data_statement.where(*filters)
        data_statement = data_statement.where(
            text(
                "news.search_vector @@ to_tsquery('indonesian', :tags_param)"
            ).bindparams(tags_param=tags_query)
        ).order_by(literal_column("rank").desc(), News.publish_date.desc())
        count_statement = count_statement.where(
            text(
                "news.search_vector @@ to_tsquery('indonesian', :tags_param)"
            ).bindparams(tags_param=tags_query)
        )

    count = session.exec(count_statement).one()

    total_pages = math.ceil(count / size) if count > 0 else 0
    has_next = page < total_pages
    has_prev = page > 1

    skip = (page - 1) * size

    data_statement = data_statement.offset(skip).limit(size)
    result = session.exec(data_statement).all()

    news = []
    if q or tags_query:
        for news_instance, rank_value in result:
            news_item = NewsWithRank.model_validate(news_instance)
            news_item.rank = rank_value
            news.append(news_item)
    else:
        for news_instance in result:
            news_item = NewsWithRank.model_validate(news_instance)
            news.append(news_item)

    return NewsPublic(
        data=news,
        count=count,
        page=page,
        size=size,
        total_pages=total_pages,
        has_next=has_next,
        has_prev=has_prev,
    )


@router.get("/top-sources", response_model=TopNewsSourcePublic)
def get_top_sources(
    session: SessionDep,
    limit: Annotated[int, Query(ge=1)] = 5,
    province: str | None = None,
):
    statement = (
        select(News.author, func.count(News.id).label("article_count"))
        .where(News.province == province if province else True)
        .group_by(News.author)
        .order_by(func.count(News.id).desc())
        .limit(limit)
    )
    result = session.exec(statement).all()
    return TopNewsSourcePublic(data=result)


MIN_START_DATE = datetime(2023, 1, 1)
MAX_END_DATE = datetime(2023, 12, 10)


@router.get("/trends", response_model=NewsTrendsPublic)
def get_trends(
    session: SessionDep,
    start_date: Annotated[
        datetime,
        Query(ge=MIN_START_DATE, le=MAX_END_DATE),
    ] = MIN_START_DATE,
    end_date: Annotated[
        datetime, Query(ge=MIN_START_DATE, le=MAX_END_DATE)
    ] = MAX_END_DATE,
    granularity: Annotated[Granularity, Query()] = Granularity.MONTHLY,
    province: str | None = None,
):
    if start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date must be before end date",
        )

    if granularity == Granularity.DAILY:
        bucket = func.date_trunc("day", News.publish_date)
        max_window_end = start_date + timedelta(days=14)
    elif granularity == Granularity.WEEKLY:
        bucket = func.date_trunc("week", News.publish_date)
        max_window_end = start_date + timedelta(weeks=12)
    else:
        bucket = func.date_trunc("month", News.publish_date)
        max_window_end = start_date + relativedelta(months=12)

    effective_end_date = min(end_date, MAX_END_DATE, max_window_end)

    statement = (
        select(bucket.label("bucket"), func.count(News.id).label("article_count"))
        .where(
            News.publish_date >= start_date,
            News.publish_date <= effective_end_date,
            News.province == province if province else True,
        )
        .group_by(bucket)
        .order_by(bucket)
    )
    results = session.exec(statement).all()

    return NewsTrendsPublic(data=results)


@router.get("/province-summary", response_model=ProvinceSummaryPublic)
def get_province_summary(session: SessionDep):
    statement = (
        select(News.province, func.count(News.id).label("article_count"))
        .where(News.province != None)
        .group_by(News.province)
        .order_by(func.count(News.id).desc())
    )
    results = session.exec(statement).all()
    return ProvinceSummaryPublic(data=results)


@router.get("/city-summary", response_model=GeoJSONFeatureCollection)
def get_city_summary(session: SessionDep, province: str):
    statement = (
        select(
            News.city,
            News.province,
            News.latitude,
            News.longitude,
            func.count(News.id).label("article_count"),
        )
        .where(News.province == province)
        .group_by(News.city, News.province, News.latitude, News.longitude)
        .order_by(func.count(News.id).desc())
    )
    results = session.exec(statement).all()

    features = []
    for row in results:
        city_data = CitySummaryResult(
            city=row.city,
            province=row.province,
            latitude=row.latitude,
            longitude=row.longitude,
            article_count=row.article_count,
        )
        feature = GeoJSONFeature(
            geometry=GeoJSONGeometry(
                coordinates=[row.longitude, row.latitude],
            ),
            properties=CitySummaryProperties(
                city=city_data.city,
                province=city_data.province,
                article_count=city_data.article_count,
            ),
        )
        features.append(feature)

    return GeoJSONFeatureCollection(features=features)


@router.get("/{news_id}", response_model=News)
def get_news_by_id(session: SessionDep, news_id: int):
    news = session.get(News, news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news
