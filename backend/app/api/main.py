from app.api.routes import auth, geojson, news, users, utils
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(geojson.router)
api_router.include_router(news.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
