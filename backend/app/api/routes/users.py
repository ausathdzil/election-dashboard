from app.api.deps import CurrentUser, SessionDep
from app.models.user import User, UserPublic
from fastapi import APIRouter
from sqlmodel import select

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserPublic)
def read_users_me(current_user: CurrentUser) -> User:
    return current_user


@router.get("/", response_model=list[UserPublic])
def read_users(session: SessionDep) -> list[User]:
    statement = select(User)
    users = session.exec(statement).all()
    return users
