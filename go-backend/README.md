# Convin Voice API - Go Backend

A high-performance Go backend for the Convin Voice API Platform, providing Speech-to-Text (STT) and Text-to-Speech (TTS) capabilities.

## Features

- **Speech-to-Text (STT)**
  - Real-time streaming transcription via WebSocket
  - Batch audio file processing
  - Multi-language support (36+ languages)
  - Speaker diarization
  - Custom vocabulary support
  - Profanity filtering
  - Smart punctuation and formatting

- **Text-to-Speech (TTS)**
  - High-quality neural voices
  - Multiple voice options and languages
  - Speed and pitch control
  - Emotion and style customization
  - SSML support
  - Multiple audio formats (WAV, MP3, OGG, etc.)

- **Authentication & Security**
  - JWT-based authentication
  - API key management
  - Role-based access control
  - Rate limiting
  - CORS support

- **Developer Experience**
  - RESTful API design
  - WebSocket support for real-time features
  - Comprehensive error handling
  - Request/response logging
  - Usage tracking and analytics

## Quick Start

### Prerequisites

- Go 1.21 or later
- PostgreSQL 12 or later
- Redis 6 or later (optional, for caching)

### Using Docker Compose (Recommended)

1. Clone the repository and navigate to the backend directory:
```bash
cd go-backend
```

2. Start the services:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis on port 6379
- Go API server on port 8080

### Manual Setup

1. Install dependencies:
```bash
go mod download
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

3. Start PostgreSQL and Redis (if not using Docker)

4. Run the application:
```bash
go run main.go
```

## API Documentation

### Authentication

#### Register a new user
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Speech-to-Text

#### Transcribe audio file
```bash
curl -X POST http://localhost:8080/api/v1/stt/transcribe \
  -H "X-API-Key: YOUR_API_KEY" \
  -F "audio=@audio.wav" \
  -F "language=en-US" \
  -F "enable_diarization=true"
```

#### Get supported languages
```bash
curl http://localhost:8080/api/v1/stt/languages
```

### Text-to-Speech

#### Generate speech
```bash
curl -X POST http://localhost:8080/api/v1/tts/generate \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, welcome to Convin Voice API!",
    "voice": "sarah-neural",
    "language": "en-US",
    "speed": 1.0,
    "format": "wav"
  }'
```

#### Get available voices
```bash
curl http://localhost:8080/api/v1/tts/voices
```

### WebSocket Streaming

#### Real-time STT
```javascript
const ws = new WebSocket('ws://localhost:8080/ws/stt?api_key=YOUR_API_KEY&language=en-US');

ws.onopen = function() {
    console.log('Connected to STT WebSocket');
};

ws.onmessage = function(event) {
    const response = JSON.parse(event.data);
    console.log('Transcript:', response.transcript);
};

// Send audio data
ws.send(audioData);
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Environment (development/production) | development |
| `PORT` | Server port | 8080 |
| `DATABASE_URL` | PostgreSQL connection string | postgres://user:password@localhost/convin_voice_api?sslmode=disable |
| `REDIS_URL` | Redis connection string | redis://localhost:6379 |
| `JWT_SECRET` | JWT signing secret | your-secret-key |
| `API_KEY_SECRET` | API key signing secret | your-api-key-secret |

## Development

### Project Structure

```
go-backend/
├── internal/
│   ├── config/          # Configuration management
│   ├── database/        # Database connection and migrations
│   ├── handlers/        # HTTP handlers
│   ├── middleware/      # HTTP middleware
│   ├── models/          # Data models
│   ├── routes/          # Route definitions
│   └── services/        # Business logic
├── main.go             # Application entry point
├── go.mod              # Go module file
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── README.md           # This file
```

### Running Tests

```bash
go test ./...
```

### Building for Production

```bash
go build -o convin-voice-api main.go
```

## Deployment

### Using Docker

1. Build the Docker image:
```bash
docker build -t convin-voice-api .
```

2. Run the container:
```bash
docker run -p 8080:8080 \
  -e DATABASE_URL=your_database_url \
  -e REDIS_URL=your_redis_url \
  convin-voice-api
```

### Using Docker Compose

```bash
docker-compose up -d
```

## Monitoring and Logging

The application includes comprehensive logging and monitoring:

- Request/response logging
- Error tracking
- Performance metrics
- Usage analytics

## Security Considerations

- All API endpoints require authentication
- Rate limiting is implemented to prevent abuse
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Secure password hashing with bcrypt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
