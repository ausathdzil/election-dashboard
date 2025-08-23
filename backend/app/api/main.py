from app.api.routes import geojson, news, utils
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(utils.router)
api_router.include_router(news.router)
api_router.include_router(geojson.router)
