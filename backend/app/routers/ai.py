from fastapi import APIRouter, HTTPException
from backend.app.schemas import AIChatRequest, AIChatResponse
from backend.app.services.ai_service import generate_ai_response

router = APIRouter(prefix="/ai", tags=["AI Health Assistant"])

@router.post("/chat", response_model=AIChatResponse)
async def chat_with_ai(req: AIChatRequest):
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    result = await generate_ai_response(req.message, req.history)
    return result
