from app.api.deps import CurrentUser, CurrentUserOptional, SessionDep
from app.models.generic import Message
from app.models.schema import Topic
from app.models.topic import TopicCreate, TopicPublic, TopicsPublic, TopicUpdate
from fastapi import APIRouter, HTTPException, status
from sqlmodel import and_, func, or_, select

router = APIRouter(prefix="/topics", tags=["topics"])


@router.get("/", response_model=TopicsPublic)
def read_topics(
    session: SessionDep,
    current_user: CurrentUserOptional,
    owner_id: int | None = None,
    q: str | None = None,
) -> TopicsPublic:
    base_statement = select(Topic)

    if current_user is None:
        if owner_id is not None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required to filter by ownership",
            )
        base_statement = base_statement.where(Topic.is_public)
    elif owner_id is not None:
        if current_user.is_superuser or owner_id == current_user.id:
            base_statement = base_statement.where(Topic.owner_id == owner_id)
        else:
            base_statement = base_statement.where(
                and_(Topic.owner_id == owner_id, Topic.is_public)
            )
    elif not current_user.is_superuser:
        base_statement = base_statement.where(
            or_(Topic.is_public, Topic.owner_id == current_user.id)
        )

    if q:
        search_term = f"%{q}%"
        base_statement = base_statement.where(
            or_(
                Topic.title.ilike(search_term),
                Topic.tags.any(lambda tag: tag.ilike(search_term)),
            )
        )

    count_statement = select(func.count()).select_from(base_statement.subquery())
    count = session.exec(count_statement).one()
    result = session.exec(base_statement).all()
    return TopicsPublic(data=result, count=count)


@router.get("/{topic_id}", response_model=TopicPublic)
def read_topic(
    session: SessionDep, topic_id: int, current_user: CurrentUserOptional
) -> TopicPublic:
    topic = session.get(Topic, topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    if not topic.is_public and (
        current_user is None or topic.owner_id != current_user.id
    ):
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
    if topic.owner_id != current_user.id:
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
    if topic.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    session.delete(topic)
    session.commit()
    return Message(message="Topic deleted successfully")
