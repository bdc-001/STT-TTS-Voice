# Convin Voice API Documentation

## Overview

The Convin Voice API provides high-quality Speech-to-Text (STT) and Text-to-Speech (TTS) capabilities through a RESTful API and WebSocket connections.

**Base URL:** `http://localhost:8080/api/v1`

## Authentication

The API uses API keys for authentication. Include your API key in the request header:

```
X-API-Key: your_api_key_here
```

Or use Bearer token format:

```
Authorization: Bearer your_api_key_here
```

## Rate Limiting

- **Free Tier:** 100 requests per hour
- **Standard Tier:** 1,000 requests per hour
- **Enterprise:** Custom limits

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Request limit per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

## Error Handling

All errors follow this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "code": 400
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User

Create a new user account.

**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "api_key": "your_api_key_here"
  },
  "message": "User registered successfully"
}
```

### Login User

Authenticate user and get API keys.

**POST** `/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "api_keys": [
      {
        "id": 1,
        "key": "your_api_key_here",
        "name": "Default",
        "permissions": "all",
        "is_active": true,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  },
  "message": "Login successful"
}
```

---

## Speech-to-Text (STT) Endpoints

### Transcribe Audio

Convert audio to text.

**POST** `/stt/transcribe`

**Headers:**
- `X-API-Key`: Your API key
- `Content-Type`: `multipart/form-data`

**Form Data:**
- `audio` (file): Audio file to transcribe
- `language` (string, optional): Language code (default: "en-US")
- `format` (string, optional): Audio format (default: "wav")
- `sample_rate` (int, optional): Sample rate in Hz (default: 16000)
- `channels` (int, optional): Number of channels (default: 1)
- `enable_diarization` (boolean, optional): Enable speaker diarization (default: false)
- `enable_punctuation` (boolean, optional): Enable punctuation (default: true)
- `enable_profanity_filter` (boolean, optional): Enable profanity filter (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "transcript": "Hello, welcome to the Convin Voice API platform demonstration.",
    "segments": [
      {
        "start": 0.0,
        "end": 2.5,
        "text": "Hello, welcome to the Convin Voice API platform demonstration.",
        "speaker": "Speaker A",
        "confidence": 0.95
      }
    ],
    "confidence": 0.95,
    "language": "en-US",
    "duration": 2.5,
    "word_count": 8,
    "metadata": {
      "model_version": "v1.0",
      "processing_time": "285ms",
      "format": "wav"
    }
  }
}
```

### Get Supported Languages

Get list of supported languages for STT.

**GET** `/stt/languages`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "en-US",
      "name": "English (US)"
    },
    {
      "code": "es-ES",
      "name": "Spanish (Spain)"
    }
  ]
}
```

### Get Supported Formats

Get list of supported audio formats.

**GET** `/stt/formats`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "format": "wav",
      "description": "WAV audio file"
    },
    {
      "format": "mp3",
      "description": "MP3 audio file"
    }
  ]
}
```

### WebSocket Streaming STT

Real-time audio transcription via WebSocket.

**WebSocket** `/ws/stt`

**Query Parameters:**
- `api_key`: Your API key
- `language`: Language code (optional, default: "en-US")

**Connection:**
```javascript
const ws = new WebSocket('ws://localhost:8080/ws/stt?api_key=YOUR_API_KEY&language=en-US');

ws.onopen = function() {
    console.log('Connected to STT WebSocket');
};

ws.onmessage = function(event) {
    const response = JSON.parse(event.data);
    console.log('Transcript:', response.transcript);
};

// Send audio data as binary
ws.send(audioData);
```

---

## Text-to-Speech (TTS) Endpoints

### Generate Speech

Convert text to speech.

**POST** `/tts/generate`

**Headers:**
- `X-API-Key`: Your API key
- `Content-Type`: `application/json`

**Request Body:**
```json
{
  "text": "Hello, welcome to Convin Voice API!",
  "voice": "sarah-neural",
  "language": "en-US",
  "speed": 1.0,
  "pitch": 1.0,
  "emotion": "neutral",
  "format": "wav",
  "sample_rate": 22050,
  "ssml": false
}
```

**Response:**
Returns audio data directly with appropriate headers:
- `Content-Type`: `audio/wav`
- `Content-Length`: File size
- `X-Duration`: Audio duration in seconds
- `X-Voice`: Voice name used
- `X-Language`: Language used

### Generate Speech (JSON Response)

Convert text to speech with JSON response containing audio data.

**POST** `/tts/generate-json`

**Headers:**
- `X-API-Key`: Your API key
- `Content-Type`: `application/json`

**Request Body:** Same as `/tts/generate`

**Response:**
```json
{
  "success": true,
  "data": {
    "audio_data": "base64_encoded_audio_data",
    "duration": 2.5,
    "format": "wav",
    "sample_rate": 22050,
    "channels": 1,
    "bit_rate": 128000,
    "metadata": {
      "model_version": "v1.0",
      "voice_id": "sarah-neural",
      "language": "en-US",
      "speed": 1.0,
      "pitch": 1.0,
      "emotion": "neutral"
    }
  }
}
```

### Get Available Voices

Get list of available voices.

**GET** `/tts/voices`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "sarah-neural",
      "name": "Sarah",
      "gender": "Female",
      "language": "en-US",
      "accent": "US English",
      "description": "Warm and friendly female voice",
      "is_active": true
    }
  ]
}
```

### Get Voice by ID

Get specific voice details.

**GET** `/tts/voices/{id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "sarah-neural",
    "name": "Sarah",
    "gender": "Female",
    "language": "en-US",
    "accent": "US English",
    "description": "Warm and friendly female voice",
    "is_active": true
  }
}
```

### Get Supported Languages

Get list of supported languages for TTS.

**GET** `/tts/languages`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "en-US",
      "name": "English (US)"
    }
  ]
}
```

### Get Supported Formats

Get list of supported audio formats for TTS.

**GET** `/tts/formats`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "format": "wav",
      "description": "WAV audio file (uncompressed)"
    },
    {
      "format": "mp3",
      "description": "MP3 audio file (compressed)"
    }
  ]
}
```

---

## User Management Endpoints

### Get Profile

Get user profile information.

**GET** `/profile`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Update Profile

Update user profile information.

**PUT** `/profile`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`
- `Content-Type`: `application/json`

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "newemail@example.com",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "Profile updated successfully"
}
```

### Get API Keys

Get user's API keys.

**GET** `/api-keys`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "key": "your_api_key_here",
      "name": "Default",
      "permissions": "all",
      "is_active": true,
      "last_used_at": "2024-01-01T00:00:00Z",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Create API Key

Create a new API key.

**POST** `/api-keys`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`
- `Content-Type`: `application/json`

**Request Body:**
```json
{
  "name": "My API Key",
  "permissions": "all"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "key": "new_api_key_here",
    "name": "My API Key",
    "permissions": "all",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "API key created successfully"
}
```

### Update API Key

Update an existing API key.

**PUT** `/api-keys/{id}`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`
- `Content-Type`: `application/json`

**Request Body:**
```json
{
  "name": "Updated API Key",
  "permissions": "stt",
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "key": "new_api_key_here",
    "name": "Updated API Key",
    "permissions": "stt",
    "is_active": true,
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "API key updated successfully"
}
```

### Delete API Key

Delete an API key.

**DELETE** `/api-keys/{id}`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`

**Response:**
```json
{
  "success": true,
  "message": "API key deleted successfully"
}
```

### Get Usage Statistics

Get user's usage statistics.

**GET** `/usage`

**Headers:**
- `Authorization`: `Bearer your_jwt_token`

**Query Parameters:**
- `start_date` (optional): Start date in YYYY-MM-DD format
- `end_date` (optional): End date in YYYY-MM-DD format

**Response:**
```json
{
  "success": true,
  "data": {
    "total_stt_minutes": 120.5,
    "total_tts_characters": 50000,
    "total_cost": 25.50,
    "usage_count": 150,
    "usage": [
      {
        "id": 1,
        "type": "stt",
        "amount": 300,
        "cost": 5.00,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

## SDK Examples

### Python

```python
import requests
import json

# Configuration
API_BASE_URL = "http://localhost:8080/api/v1"
API_KEY = "your_api_key_here"

# STT Example
def transcribe_audio(audio_file_path):
    url = f"{API_BASE_URL}/stt/transcribe"
    headers = {"X-API-Key": API_KEY}
    
    with open(audio_file_path, 'rb') as audio_file:
        files = {'audio': audio_file}
        data = {
            'language': 'en-US',
            'enable_diarization': True
        }
        
        response = requests.post(url, headers=headers, files=files, data=data)
        return response.json()

# TTS Example
def generate_speech(text, voice="sarah-neural"):
    url = f"{API_BASE_URL}/tts/generate-json"
    headers = {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    }
    
    data = {
        "text": text,
        "voice": voice,
        "language": "en-US",
        "speed": 1.0,
        "format": "wav"
    }
    
    response = requests.post(url, headers=headers, json=data)
    return response.json()
```

### JavaScript/Node.js

```javascript
const axios = require('axios');

const API_BASE_URL = 'http://localhost:8080/api/v1';
const API_KEY = 'your_api_key_here';

// STT Example
async function transcribeAudio(audioFilePath) {
    const formData = new FormData();
    formData.append('audio', fs.createReadStream(audioFilePath));
    formData.append('language', 'en-US');
    formData.append('enable_diarization', 'true');
    
    const response = await axios.post(`${API_BASE_URL}/stt/transcribe`, formData, {
        headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'multipart/form-data'
        }
    });
    
    return response.data;
}

// TTS Example
async function generateSpeech(text, voice = 'sarah-neural') {
    const response = await axios.post(`${API_BASE_URL}/tts/generate-json`, {
        text: text,
        voice: voice,
        language: 'en-US',
        speed: 1.0,
        format: 'wav'
    }, {
        headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}
```

### cURL Examples

```bash
# Register user
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'

# Transcribe audio
curl -X POST http://localhost:8080/api/v1/stt/transcribe \
  -H "X-API-Key: your_api_key_here" \
  -F "audio=@audio.wav" \
  -F "language=en-US" \
  -F "enable_diarization=true"

# Generate speech
curl -X POST http://localhost:8080/api/v1/tts/generate-json \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "voice": "sarah-neural", "language": "en-US"}'
```

---

## WebSocket Streaming

### Real-time STT

Connect to the WebSocket endpoint for real-time audio transcription:

```javascript
const ws = new WebSocket('ws://localhost:8080/ws/stt?api_key=YOUR_API_KEY&language=en-US');

ws.onopen = function() {
    console.log('Connected to STT WebSocket');
};

ws.onmessage = function(event) {
    const response = JSON.parse(event.data);
    console.log('Transcript:', response.transcript);
    console.log('Confidence:', response.confidence);
};

ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};

ws.onclose = function() {
    console.log('WebSocket connection closed');
};

// Send audio data
function sendAudio(audioData) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(audioData);
    }
}
```

---

## Best Practices

1. **Error Handling**: Always check response status codes and handle errors gracefully.

2. **Rate Limiting**: Implement exponential backoff when hitting rate limits.

3. **File Size**: Keep audio files under 50MB for optimal performance.

4. **Audio Quality**: Use high-quality audio (16kHz+ sample rate) for better transcription accuracy.

5. **API Keys**: Store API keys securely and rotate them regularly.

6. **Monitoring**: Monitor your usage and costs through the usage endpoint.

7. **Caching**: Cache voice lists and language lists to reduce API calls.

8. **WebSocket**: Use WebSocket for real-time applications to reduce latency.

---

## Support

For support and questions:
- Email: support@convin.ai
- Documentation: https://docs.convin.ai
- Status Page: https://status.convin.ai
