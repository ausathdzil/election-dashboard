from app.api.deps import CurrentUser, SessionDep
from app.models.generic import Message
from app.models.schema import Topic
from app.models.topic import TopicCreate, TopicPublic, TopicsPublic, TopicUpdate
from fastapi import APIRouter, HTTPException
from sqlmodel import select

router = APIRouter(prefix="/topics", tags=["topics"])


@router.get("/", response_model=TopicsPublic)
def read_topics(session: SessionDep) -> TopicsPublic:
    statement = select(Topic).where(Topic.is_public)
    result = session.exec(statement).all()

    return TopicsPublic(data=result)


@router.get("/{id}", response_model=TopicPublic)
def read_topic(session: SessionDep, current_user: CurrentUser, id: int) -> TopicPublic:
    topic = session.get(Topic, id)
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


@router.put("/{id}", response_model=TopicPublic)
def update_topic(
    *, session: SessionDep, current_user: CurrentUser, id: int, topic_in: TopicUpdate
) -> TopicPublic:
    topic = session.get(Topic, id)
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


@router.delete("/{id}", response_model=Message)
def delete_topic(*, session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    topic = session.get(Topic, id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if not topic.owner_id == current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    session.delete(topic)
    session.commit()
    return Message(message="Topic deleted successfully")
