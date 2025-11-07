package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Username  string         `json:"username" gorm:"uniqueIndex;not null"`
	Email     string         `json:"email" gorm:"uniqueIndex;not null"`
	Password  string         `json:"-" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	APIKeys []APIKey `json:"api_keys,omitempty" gorm:"foreignKey:UserID"`
	Usage   []Usage  `json:"usage,omitempty" gorm:"foreignKey:UserID"`
}

// APIKey represents an API key for a user
type APIKey struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	UserID      uint           `json:"user_id" gorm:"not null"`
	Key         string         `json:"key" gorm:"uniqueIndex;not null"`
	Name        string         `json:"name" gorm:"not null"`
	Permissions string         `json:"permissions" gorm:"default:'all'"` // all, stt, tts
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	LastUsedAt  *time.Time     `json:"last_used_at"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	User User `json:"user,omitempty" gorm:"foreignKey:UserID"`
}

// Usage represents API usage tracking
type Usage struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	UserID    uint           `json:"user_id" gorm:"not null"`
	APIKeyID  uint           `json:"api_key_id" gorm:"not null"`
	Type      string         `json:"type" gorm:"not null"` // stt, tts
	Amount    int64          `json:"amount" gorm:"not null"` // minutes for STT, characters for TTS
	Cost      float64        `json:"cost" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	User   User   `json:"user,omitempty" gorm:"foreignKey:UserID"`
	APIKey APIKey `json:"api_key,omitempty" gorm:"foreignKey:APIKeyID"`
}

// STTRequest represents a speech-to-text request
type STTRequest struct {
	AudioData     []byte            `json:"audio_data"`
	Language      string            `json:"language"`      // en-US, es-ES, etc.
	Format        string            `json:"format"`        // wav, mp3, flac
	SampleRate    int               `json:"sample_rate"`
	Channels      int               `json:"channels"`
	EnableDiarization bool          `json:"enable_diarization"`
	CustomWords   []string          `json:"custom_words"`
	EnablePunctuation bool          `json:"enable_punctuation"`
	EnableProfanityFilter bool      `json:"enable_profanity_filter"`
	Metadata      map[string]string `json:"metadata"`
}

// STTResponse represents a speech-to-text response
type STTResponse struct {
	Transcript    string                 `json:"transcript"`
	Segments      []STTSegment           `json:"segments,omitempty"`
	Confidence    float64                `json:"confidence"`
	Language      string                 `json:"language"`
	Duration      float64                `json:"duration"`
	WordCount     int                    `json:"word_count"`
	Metadata      map[string]interface{} `json:"metadata,omitempty"`
}

// STTSegment represents a segment of transcribed audio
type STTSegment struct {
	Start       float64 `json:"start"`
	End         float64 `json:"end"`
	Text        string  `json:"text"`
	Speaker     string  `json:"speaker,omitempty"`
	Confidence  float64 `json:"confidence"`
}

// TTSRequest represents a text-to-speech request
type TTSRequest struct {
	Text         string            `json:"text"`
	Voice        string            `json:"voice"`        // voice ID
	Language     string            `json:"language"`     // en-US, es-ES, etc.
	Speed        float64           `json:"speed"`        // 0.5 - 2.0
	Pitch        float64           `json:"pitch"`        // 0.5 - 2.0
	Emotion      string            `json:"emotion"`      // neutral, happy, sad, angry
	Format       string            `json:"format"`       // wav, mp3, ogg
	SampleRate   int               `json:"sample_rate"`  // 16000, 22050, 44100
	SSML         bool              `json:"ssml"`         // whether text is SSML
	Metadata     map[string]string `json:"metadata"`
}

// TTSResponse represents a text-to-speech response
type TTSResponse struct {
	AudioData    []byte                 `json:"audio_data"`
	AudioURL     string                 `json:"audio_url,omitempty"`
	Duration     float64                `json:"duration"`
	Format       string                 `json:"format"`
	SampleRate   int                    `json:"sample_rate"`
	Channels     int                    `json:"channels"`
	BitRate      int                    `json:"bit_rate"`
	Metadata     map[string]interface{} `json:"metadata,omitempty"`
}

// Voice represents an available TTS voice
type Voice struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Gender      string `json:"gender"`
	Language    string `json:"language"`
	Accent      string `json:"accent"`
	Description string `json:"description"`
	SampleURL   string `json:"sample_url,omitempty"`
	IsActive    bool   `json:"is_active"`
}

// ErrorResponse represents an error response
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
	Code    int    `json:"code"`
}

// SuccessResponse represents a success response
type SuccessResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message,omitempty"`
}
