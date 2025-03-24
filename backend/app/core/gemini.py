from google import genai
import os
import logging
from typing import List, Tuple

# API 키 검증
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logging.warning("GEMINI_API_KEY is not set. Please set the environment variable.")
    raise ValueError("GEMINI_API_KEY environment variable is required")

# Gemini 클라이언트 설정
client = genai.Client(api_key=GEMINI_API_KEY)

class ChatManager:
    def __init__(self):
        self.chat = client.chats.create(model="gemini-2.0-flash")
    
    def _get_next_version(self, filename: str) -> str:
        # Remove extension
        base_name = os.path.splitext(filename)[0]
        
        # Extract current version number
        if '_v' in base_name:
            base_parts = base_name.rsplit('_v', 1)
            current_version = int(base_parts[1])
            new_version = current_version + 1
            return f"{base_parts[0]}_v{new_version}.txt"
        else:
            return f"{base_name}_v1.txt"

    def send_message(self, content: str, text_file: str = None) -> Tuple[str, str]:
        try:
            if text_file:
                # Read the current content
                with open(text_file, 'r') as f:
                    current_content = f.read()

                # Create the update prompt
                update_prompt = f"""Please update the following text based on this request: "{content}"

Current text content:
{current_content}

Please provide only the updated text content without any additional explanations or formatting."""

                # Get response for file update
                file_response = self.chat.send_message(update_prompt)
                
                # Save updated content to new version
                new_filename = self._get_next_version(text_file)
                with open(new_filename, 'w') as f:
                    f.write(file_response.text)

                # Get chat response
                chat_response = self.chat.send_message(f"I've updated the text file according to your request: {content}")
                
                return chat_response.text, new_filename
            else:
                # Regular chat without file update
                response = self.chat.send_message(content)
                return response.text, None

        except Exception as e:
            logging.error(f"Error in send_message: {str(e)}")
            raise

    def get_history(self) -> List[dict]:
        try:
            history = []
            for message in self.chat.get_history():
                history.append({
                    "role": message.role,
                    "content": message.parts[0].text
                })
            return history
        except Exception as e:
            logging.error(f"Error in get_history: {str(e)}")
            raise 