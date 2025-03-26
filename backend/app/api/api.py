from fastapi import APIRouter
from app.api.endpoints import stories, voices
from app.core.config import settings

api_router = APIRouter()

api_router.include_router(stories.router, prefix="/stories", tags=["stories"])
api_router.include_router(voices.router, prefix="/voices", tags=["voices"])
