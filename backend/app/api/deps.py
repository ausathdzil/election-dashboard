from typing import Annotated, Generator

from fastapi import Depends

from app.core.db import engine
from sqlmodel import Session


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
