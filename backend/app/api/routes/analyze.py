from fastapi import APIRouter
from pydantic import BaseModel

from app.services.gemini_service import analyze_emergency
from app.services.hospital_service import find_nearest_hospital

router = APIRouter()


class EmergencyRequest(BaseModel):
    category: str
    age: int
    gender: str
    description: str
    latitude: float | None = None
    longitude: float | None = None


@router.post("/analyze")
async def analyze(request: EmergencyRequest):

    result = analyze_emergency(
        request.category,
        request.age,
        request.gender,
        request.description
    )

    result["user_location"] = {
        "latitude": request.latitude,
        "longitude": request.longitude
    }

    hospital = find_nearest_hospital(
        request.latitude,
        request.longitude
    )

    result["hospital"] = hospital

    return result