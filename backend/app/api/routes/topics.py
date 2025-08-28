from app.api.deps import CurrentUser, CurrentUserOptional, SessionDep
from app.models.generic import Message
from app.models.schema import News, Topic
from app.models.topic import TopicCreate, TopicPublic, TopicsPublic, TopicUpdate
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select, or_

router = APIRouter(prefix="/topics", tags=["topics"])


@router.get("/", response_model=TopicsPublic)
def read_topics(session: SessionDep, current_user: CurrentUserOptional) -> TopicsPublic:
    base_statement = select(Topic)
    if current_user is None:
        base_statement = base_statement.where(Topic.is_public)
    elif not current_user.is_superuser:
        base_statement = base_statement.where(
            or_(Topic.is_public, Topic.owner_id == current_user.id)
        )
    count_statement = select(func.count()).select_from(base_statement.subquery())
    count = session.exec(count_statement).one()
    result = session.exec(base_statement).all()
    return TopicsPublic(data=result, count=count)


@router.get("/{topic_id}", response_model=TopicPublic)
def read_topic(
    session: SessionDep, current_user: CurrentUser, topic_id: int
) -> TopicPublic:
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if not topic.is_public and topic.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return topic


@router.post("/", response_model=TopicPublic)
def create_topic(
    *, session: SessionDep, current_user: CurrentUser, topic_in: TopicCreate
) -> TopicPublic:
    topic = Topic.model_validate(topic_in, update={"owner_id": current_user.id})
    session.add(topic)
    session.commit()
    session.refresh(topic)
    return topic


@router.put("/{topic_id}", response_model=TopicPublic)
def update_topic(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    topic_id: int,
    topic_in: TopicUpdate,
) -> TopicPublic:
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if not topic.owner_id == current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    update_dict = topic_in.model_dump(exclude_unset=True)
    topic.sqlmodel_update(update_dict)
    session.add(topic)
    session.commit()
    session.refresh(topic)
    return topic


@router.delete("/{topic_id}", response_model=Message)
def delete_topic(
    *, session: SessionDep, current_user: CurrentUser, topic_id: int
) -> Message:
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if not topic.owner_id == current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    session.delete(topic)
    session.commit()
    return Message(message="Topic deleted successfully")


@router.post("/{topic_id}/news/{news_id}", response_model=Message)
def add_news_to_topic(
    *, session: SessionDep, current_user: CurrentUser, topic_id: int, news_id: int
):
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if topic.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    news = session.get(News, news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    if news not in topic.news:
        topic.news.append(news)
        session.add(topic)
        session.commit()
        session.refresh(topic)
    return Message(message=f"News {news_id} added to topic successfully")


@router.delete("/{topic_id}/news/{news_id}", response_model=Message)
def remove_news_from_topic(
    *, session: SessionDep, current_user: CurrentUser, topic_id: int, news_id: int
):
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if topic.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    news = session.get(News, news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    if news not in topic.news:
        raise HTTPException(status_code=404, detail="News not found in topic")
    topic.news.remove(news)
    session.add(topic)
    session.commit()
    session.refresh(topic)
    return Message(message=f"News {news_id} removed from topic successfully")
