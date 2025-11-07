#!/bin/bash

# Test script for Convin Voice API

API_BASE_URL="http://localhost:8080/api/v1"

echo "🚀 Testing Convin Voice API"
echo "=========================="

# Test health check
echo "1. Testing health check..."
curl -s "$API_BASE_URL/../health" | jq .
echo ""

# Test registration
echo "2. Testing user registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }')

echo "$REGISTER_RESPONSE" | jq .

# Extract API key from registration response
API_KEY=$(echo "$REGISTER_RESPONSE" | jq -r '.data.api_key')
echo "API Key: $API_KEY"
echo ""

# Test login
echo "3. Testing user login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE" | jq .
echo ""

# Test STT supported languages
echo "4. Testing STT supported languages..."
curl -s "$API_BASE_URL/stt/languages" | jq .
echo ""

# Test TTS available voices
echo "5. Testing TTS available voices..."
curl -s "$API_BASE_URL/tts/voices" | jq .
echo ""

# Test TTS generation (JSON response)
echo "6. Testing TTS generation..."
TTS_RESPONSE=$(curl -s -X POST "$API_BASE_URL/tts/generate-json" \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, welcome to Convin Voice API!",
    "voice": "sarah-neural",
    "language": "en-US",
    "speed": 1.0,
    "format": "wav"
  }')

echo "$TTS_RESPONSE" | jq .
echo ""

# Test usage statistics
echo "7. Testing usage statistics..."
curl -s -X GET "$API_BASE_URL/usage" \
  -H "X-API-Key: $API_KEY" | jq .
echo ""

echo "✅ API testing completed!"
