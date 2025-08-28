from datetime import timedelta
from typing import Annotated

from app.api.deps import SessionDep
from app.core.config import settings
from app.core.security import create_access_token
from app.crud.user import authenticate, create_user, get_user_by_email
from app.models.schema import User
from app.models.token import Token
from app.models.user import UserCreate, UserPublic, UserRegister
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=create_access_token(user.id, expires_delta=access_token_expires),
    )


@router.post("/signup", response_model=UserPublic)
def signup(session: SessionDep, user_in: UserRegister) -> User:
    user = get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system",
        )
    user_create = UserCreate.model_validate(user_in)
    user = create_user(session=session, user_create=user_create)
    return user
