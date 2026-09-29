import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.app.config import settings
from backend.app.database import engine, Base, SessionLocal
from backend.app.services.seed_service import seed_database

# Routers
from backend.app.routers.auth import router as auth_router
from backend.app.routers.patients import router as patients_router
from backend.app.routers.doctors import router as doctors_router
from backend.app.routers.appointments import router as appointments_router
from backend.app.routers.prescriptions import router as prescriptions_router
from backend.app.routers.medications import router as medications_router
from backend.app.routers.consultations import router as consultations_router
from backend.app.routers.notifications import router as notifications_router
from backend.app.routers.admin import router as admin_router
from backend.app.routers.ai import router as ai_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables and seed data
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield
    # Shutdown

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Arogya Setu Telemedicine & Health Management Backend API for IOTRICITY 2026 Hackathon",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory if available
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Root & Health check
@app.get("/")
def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs",
        "api_prefix": settings.API_PREFIX
    }

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": "connected"
    }

# Register API Routers
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(patients_router, prefix=settings.API_PREFIX)
app.include_router(doctors_router, prefix=settings.API_PREFIX)
app.include_router(appointments_router, prefix=settings.API_PREFIX)
app.include_router(prescriptions_router, prefix=settings.API_PREFIX)
app.include_router(medications_router, prefix=settings.API_PREFIX)
app.include_router(consultations_router, prefix=settings.API_PREFIX)
app.include_router(notifications_router, prefix=settings.API_PREFIX)
app.include_router(admin_router, prefix=settings.API_PREFIX)
app.include_router(ai_router, prefix=settings.API_PREFIX)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
