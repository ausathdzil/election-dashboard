from app.api.deps import CurrentUser, SessionDep, get_current_superuser
from app.models.user import User, UserPublic, UsersPublic
from fastapi import APIRouter, Depends
from sqlmodel import func, select

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/",
    dependencies=[Depends(get_current_superuser)],
    response_model=UsersPublic,
)
def read_users(session: SessionDep) -> UsersPublic:
    count_statement = select(func.count()).select_from(User)
    count = session.exec(count_statement).one()
    statement = select(User)
    users = session.exec(statement).all()
    return UsersPublic(
        data=users,
        count=count,
    )


@router.get("/me", response_model=UserPublic)
def read_users_me(current_user: CurrentUser) -> User:
    return current_user
