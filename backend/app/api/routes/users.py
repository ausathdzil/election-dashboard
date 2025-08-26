import uuid

from app.api.deps import CurrentUser, SessionDep, get_current_superuser
from app.crud.user import create_user, get_user_by_email, update_user
from app.models.generic import Message
from app.models.user import User, UserCreate, UserPublic, UsersPublic, UserUpdate
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import func, select

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/",
    dependencies=[Depends(get_current_superuser)],
    response_model=UsersPublic,
)
def admin_read_users(session: SessionDep) -> UsersPublic:
    count_statement = select(func.count()).select_from(User)
    count = session.exec(count_statement).one()
    statement = select(User)
    users = session.exec(statement).all()
    return UsersPublic(
        data=users,
        count=count,
    )


@router.post(
    "/", dependencies=[Depends(get_current_superuser)], response_model=UserPublic
)
def admin_create_user(session: SessionDep, user_in: UserCreate) -> UserPublic:
    user = get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system",
        )
    user = create_user(session=session, user_create=user_in)
    return user


@router.patch(
    "/{user_id}",
    dependencies=[Depends(get_current_superuser)],
    response_model=UserPublic,
)
def admin_update_user(
    *, session: SessionDep, user_id: uuid.UUID, user_in: UserUpdate
) -> UserPublic:
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this id does not exist in the system",
        )
    if user_in.email:
        existing_user = get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != user_id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with this email already exists",
            )
    db_user = update_user(session=session, db_user=db_user, user_in=user_in)
    return db_user


@router.delete(
    "/{user_id}",
    dependencies=[Depends(get_current_superuser)],
    response_model=Message,
)
def admin_delete_user(
    *, session: SessionDep, current_user: CurrentUser, user_id: uuid.UUID
) -> Message:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super users are not allowed to delete themselves",
        )
    session.delete(user)
    session.commit()
    return Message(message="User deleted successfully")


@router.get("/me", response_model=UserPublic)
def read_users_me(current_user: CurrentUser) -> User:
    return current_user
