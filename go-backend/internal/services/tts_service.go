package services

import (
	"convin-voice-api/internal/models"
	"fmt"
	"math"
	"strings"

	"github.com/sirupsen/logrus"
)

type TTSService struct {
	logger *logrus.Logger
}

func NewTTSService(logger *logrus.Logger) *TTSService {
	return &TTSService{
		logger: logger,
	}
}

// GenerateSpeech generates speech from text
func (s *TTSService) GenerateSpeech(req *models.TTSRequest) (*models.TTSResponse, error) {
	s.logger.Infof("Processing TTS request: voice=%s, language=%s, text_length=%d",
		req.Voice, req.Language, len(req.Text))

	// TODO: Integrate with actual TTS engine (ElevenLabs, Azure, etc.)
	// For now, return mock audio data
	audioData := s.generateMockAudio(req)

	response := &models.TTSResponse{
		AudioData:  audioData,
		Duration:   s.calculateSpeechDuration(req),
		Format:     req.Format,
		SampleRate: req.SampleRate,
		Channels:   1,      // Mono
		BitRate:    128000, // 128 kbps
		Metadata: map[string]interface{}{
			"model_version": "v1.0",
			"voice_id":      req.Voice,
			"language":      req.Language,
			"speed":         req.Speed,
			"pitch":         req.Pitch,
			"emotion":       req.Emotion,
		},
	}

	return response, nil
}

// GetAvailableVoices returns list of available voices
func (s *TTSService) GetAvailableVoices() []models.Voice {
	return []models.Voice{
		{
			ID:          "sarah-neural",
			Name:        "Sarah",
			Gender:      "Female",
			Language:    "en-US",
			Accent:      "US English",
			Description: "Warm and friendly female voice, perfect for customer service",
			IsActive:    true,
		},
		{
			ID:          "john-neural",
			Name:        "John",
			Gender:      "Male",
			Language:    "en-US",
			Accent:      "US English",
			Description: "Professional male voice, ideal for business presentations",
			IsActive:    true,
		},
		{
			ID:          "emma-neural",
			Name:        "Emma",
			Gender:      "Female",
			Language:    "en-GB",
			Accent:      "UK English",
			Description: "Elegant British female voice with clear pronunciation",
			IsActive:    true,
		},
		{
			ID:          "alex-neural",
			Name:        "Alex",
			Gender:      "Male",
			Language:    "en-CA",
			Accent:      "Canadian English",
			Description: "Neutral male voice with Canadian accent",
			IsActive:    true,
		},
		{
			ID:          "maria-neural",
			Name:        "María",
			Gender:      "Female",
			Language:    "es-ES",
			Accent:      "Spanish (Spain)",
			Description: "Natural Spanish female voice",
			IsActive:    true,
		},
		{
			ID:          "carlos-neural",
			Name:        "Carlos",
			Gender:      "Male",
			Language:    "es-MX",
			Accent:      "Spanish (Mexico)",
			Description: "Warm Mexican Spanish male voice",
			IsActive:    true,
		},
		{
			ID:          "sophie-neural",
			Name:        "Sophie",
			Gender:      "Female",
			Language:    "fr-FR",
			Accent:      "French",
			Description: "Elegant French female voice",
			IsActive:    true,
		},
		{
			ID:          "pierre-neural",
			Name:        "Pierre",
			Gender:      "Male",
			Language:    "fr-FR",
			Accent:      "French",
			Description: "Professional French male voice",
			IsActive:    true,
		},
		{
			ID:          "anna-neural",
			Name:        "Anna",
			Gender:      "Female",
			Language:    "de-DE",
			Accent:      "German",
			Description: "Clear German female voice",
			IsActive:    true,
		},
		{
			ID:          "priya-neural",
			Name:        "Priya",
			Gender:      "Female",
			Language:    "hi-IN",
			Accent:      "Hindi",
			Description: "Natural Hindi female voice",
			IsActive:    true,
		},
	}
}

// GetVoiceByID returns a specific voice by ID
func (s *TTSService) GetVoiceByID(voiceID string) (*models.Voice, error) {
	voices := s.GetAvailableVoices()
	for _, voice := range voices {
		if voice.ID == voiceID {
			return &voice, nil
		}
	}
	return nil, fmt.Errorf("voice not found: %s", voiceID)
}

// GetSupportedLanguages returns list of supported languages for TTS
func (s *TTSService) GetSupportedLanguages() []map[string]string {
	return []map[string]string{
		{"code": "en-US", "name": "English (US)"},
		{"code": "en-GB", "name": "English (UK)"},
		{"code": "en-CA", "name": "English (Canada)"},
		{"code": "es-ES", "name": "Spanish (Spain)"},
		{"code": "es-MX", "name": "Spanish (Mexico)"},
		{"code": "fr-FR", "name": "French"},
		{"code": "de-DE", "name": "German"},
		{"code": "hi-IN", "name": "Hindi"},
		{"code": "ja-JP", "name": "Japanese"},
		{"code": "ko-KR", "name": "Korean"},
		{"code": "zh-CN", "name": "Chinese (Simplified)"},
		{"code": "pt-BR", "name": "Portuguese (Brazil)"},
		{"code": "ru-RU", "name": "Russian"},
		{"code": "ar-SA", "name": "Arabic"},
		{"code": "it-IT", "name": "Italian"},
		{"code": "nl-NL", "name": "Dutch"},
	}
}

// GetSupportedFormats returns list of supported audio formats for TTS
func (s *TTSService) GetSupportedFormats() []map[string]string {
	return []map[string]string{
		{"format": "wav", "description": "WAV audio file (uncompressed)"},
		{"format": "mp3", "description": "MP3 audio file (compressed)"},
		{"format": "ogg", "description": "OGG audio file (compressed)"},
		{"format": "m4a", "description": "M4A audio file (compressed)"},
		{"format": "flac", "description": "FLAC audio file (lossless)"},
	}
}

func (s *TTSService) generateMockAudio(req *models.TTSRequest) []byte {
	// Generate mock audio data (sine wave for demonstration)
	duration := s.calculateSpeechDuration(req)
	sampleRate := req.SampleRate
	samples := int(duration * float64(sampleRate))

	audioData := make([]byte, samples*2) // 16-bit audio

	// Generate a simple sine wave
	frequency := 440.0 // A4 note
	if req.Pitch > 0 {
		frequency *= req.Pitch
	}

	for i := 0; i < samples; i++ {
		t := float64(i) / float64(sampleRate)
		amplitude := 0.3 * math.Sin(2*math.Pi*frequency*t)

		// Apply speed adjustment
		if req.Speed > 0 {
			amplitude *= req.Speed
		}

		// Convert to 16-bit PCM
		sample := int16(amplitude * 32767)
		audioData[i*2] = byte(sample & 0xFF)
		audioData[i*2+1] = byte((sample >> 8) & 0xFF)
	}

	return audioData
}

func (s *TTSService) calculateSpeechDuration(req *models.TTSRequest) float64 {
	// Estimate duration based on text length and speed
	wordsPerMinute := 150.0 // Average speaking rate
	if req.Speed > 0 {
		wordsPerMinute *= req.Speed
	}

	wordCount := len(strings.Fields(req.Text))
	duration := float64(wordCount) / wordsPerMinute * 60.0

	return math.Max(duration, 0.5) // Minimum 0.5 seconds
}
