from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    text_file: str  # Name of the input text file

class ChatResponse(BaseModel):
    response: str
    history: List[ChatMessage]
    updated_file: str  # Name of the updated text file 