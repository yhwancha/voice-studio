from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage
from app.core.gemini import ChatManager

router = APIRouter()
chat_manager = ChatManager()

@router.post("", response_model=ChatResponse)
async def create_chat(request: ChatRequest):
    try:
        # Send message and update text file if provided
        response, updated_file = chat_manager.send_message(request.message, request.text_file)
        
        # Get chat history
        history = chat_manager.get_history()
        
        # Convert to response format
        chat_messages = [ChatMessage(**msg) for msg in history]
        
        return ChatResponse(
            response=response,
            history=chat_messages,
            updated_file=updated_file if updated_file else request.text_file
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 