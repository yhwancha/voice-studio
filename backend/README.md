# Voice Studio Backend

The backend service for Voice Studio, providing RESTful APIs and audio processing capabilities.

## Overview

This backend service is built with FastAPI and provides the following core functionalities:
- User authentication and authorization
- Audio file processing and management
- Session scheduling and management
- Project tracking
- Client management
- Asset library management

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite (SQLAlchemy ORM)
- **Authentication**: JWT with bcrypt
- **Audio Processing**: 
  - OpenAI Whisper for speech recognition
  - Mutagen for audio file handling
  - Google Generative AI for additional processing
- **Testing**: Pytest
- **Database Migrations**: Alembic

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
alembic upgrade head
```

## Project Structure

```
backend/
├── app/                # Main application package
├── tests/             # Test files
├── main.py            # Application entry point
├── requirements.txt   # Python dependencies
└── sql_app.db         # SQLite database
```

## Running the Application

1. Start the development server:
```bash
uvicorn main:app --reload
```

2. Access the API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

Run the test suite:
```bash
pytest
```

## API Endpoints

The API provides endpoints for:
- User authentication (login, register, token refresh)
- Session management
- Audio file upload and processing
- Project management
- Client management
- Asset library operations

For detailed API documentation, visit the Swagger UI at `/docs` when the server is running.

## Database Migrations

To create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

To apply migrations:
```bash
alembic upgrade head
```

## Development Guidelines

1. Follow PEP 8 style guide
2. Write tests for new features
3. Update API documentation
4. Create database migrations for schema changes

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages in the following format:
```json
{
    "detail": "Error message description"
}
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS middleware enabled
- Input validation using Pydantic models

## Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Update documentation
4. Submit a pull request

## License

[Same as main project license] 