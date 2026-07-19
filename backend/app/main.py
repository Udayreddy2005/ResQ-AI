from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.analyze import router as analyze_router

app = FastAPI(
    title="ResQ AI Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, prefix="/api", tags=["Emergency Analysis"])


@app.get("/")
def root():
    return {
        "message": "ResQ AI Backend Running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }