from app.api.deps import CurrentUser
from app.models.user import User, UserPublic
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserPublic)
def read_users_me(current_user: CurrentUser) -> User:
    return current_user
