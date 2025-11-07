package handlers

import (
	"convin-voice-api/internal/models"
	"convin-voice-api/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type TTSHandler struct {
	ttsService     *services.TTSService
	apiKeyService  *services.APIKeyService
	logger         *logrus.Logger
}

func NewTTSHandler(ttsService *services.TTSService, apiKeyService *services.APIKeyService, logger *logrus.Logger) *TTSHandler {
	return &TTSHandler{
		ttsService:    ttsService,
		apiKeyService: apiKeyService,
		logger:        logger,
	}
}

// GenerateSpeech handles text-to-speech requests
func (h *TTSHandler) GenerateSpeech(c *gin.Context) {
	// Get API key from context
	apiKey, exists := c.Get("api_key")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "API key required",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Validate API key
	keyInfo, err := h.apiKeyService.ValidateAPIKey(apiKey.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Invalid API key",
			Message: err.Error(),
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Check permissions
	if !h.apiKeyService.HasPermission(keyInfo, "all") && !h.apiKeyService.HasPermission(keyInfo, "tts") {
		c.JSON(http.StatusForbidden, models.ErrorResponse{
			Error:   "Forbidden",
			Message: "Insufficient permissions for TTS",
			Code:    http.StatusForbidden,
		})
		return
	}

	var req models.TTSRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Set defaults
	if req.Voice == "" {
		req.Voice = "sarah-neural"
	}
	if req.Language == "" {
		req.Language = "en-US"
	}
	if req.Speed == 0 {
		req.Speed = 1.0
	}
	if req.Pitch == 0 {
		req.Pitch = 1.0
	}
	if req.Format == "" {
		req.Format = "wav"
	}
	if req.SampleRate == 0 {
		req.SampleRate = 22050
	}
	if req.Emotion == "" {
		req.Emotion = "neutral"
	}

	// Validate voice
	voice, err := h.ttsService.GetVoiceByID(req.Voice)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid voice",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Validate parameters
	if req.Speed < 0.5 || req.Speed > 2.0 {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid speed",
			Message: "Speed must be between 0.5 and 2.0",
			Code:    http.StatusBadRequest,
		})
		return
	}

	if req.Pitch < 0.5 || req.Pitch > 2.0 {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid pitch",
			Message: "Pitch must be between 0.5 and 2.0",
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Process text
	response, err := h.ttsService.GenerateSpeech(&req)
	if err != nil {
		h.logger.Errorf("TTS processing failed: %v", err)
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Processing failed",
			Message: "Failed to generate speech",
			Code:    http.StatusInternalServerError,
		})
		return
	}

	// TODO: Track usage
	// h.trackUsage(keyInfo.UserID, keyInfo.ID, "tts", len(req.Text))

	// Set appropriate headers for audio response
	c.Header("Content-Type", "audio/"+req.Format)
	c.Header("Content-Length", strconv.Itoa(len(response.AudioData)))
	c.Header("X-Duration", strconv.FormatFloat(response.Duration, 'f', 2, 64))
	c.Header("X-Voice", voice.Name)
	c.Header("X-Language", req.Language)

	c.Data(http.StatusOK, "audio/"+req.Format, response.AudioData)
}

// GetVoices returns available voices
func (h *TTSHandler) GetVoices(c *gin.Context) {
	voices := h.ttsService.GetAvailableVoices()
	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    voices,
	})
}

// GetVoice returns a specific voice by ID
func (h *TTSHandler) GetVoice(c *gin.Context) {
	voiceID := c.Param("id")
	voice, err := h.ttsService.GetVoiceByID(voiceID)
	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error:   "Voice not found",
			Message: err.Error(),
			Code:    http.StatusNotFound,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    voice,
	})
}

// GetSupportedLanguages returns supported languages for TTS
func (h *TTSHandler) GetSupportedLanguages(c *gin.Context) {
	languages := h.ttsService.GetSupportedLanguages()
	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    languages,
	})
}

// GetSupportedFormats returns supported audio formats for TTS
func (h *TTSHandler) GetSupportedFormats(c *gin.Context) {
	formats := h.ttsService.GetSupportedFormats()
	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    formats,
	})
}

// GenerateSpeechJSON returns TTS response as JSON (for API consistency)
func (h *TTSHandler) GenerateSpeechJSON(c *gin.Context) {
	// Get API key from context
	apiKey, exists := c.Get("api_key")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "API key required",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Validate API key
	keyInfo, err := h.apiKeyService.ValidateAPIKey(apiKey.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Invalid API key",
			Message: err.Error(),
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Check permissions
	if !h.apiKeyService.HasPermission(keyInfo, "all") && !h.apiKeyService.HasPermission(keyInfo, "tts") {
		c.JSON(http.StatusForbidden, models.ErrorResponse{
			Error:   "Forbidden",
			Message: "Insufficient permissions for TTS",
			Code:    http.StatusForbidden,
		})
		return
	}

	var req models.TTSRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Set defaults
	if req.Voice == "" {
		req.Voice = "sarah-neural"
	}
	if req.Language == "" {
		req.Language = "en-US"
	}
	if req.Speed == 0 {
		req.Speed = 1.0
	}
	if req.Pitch == 0 {
		req.Pitch = 1.0
	}
	if req.Format == "" {
		req.Format = "wav"
	}
	if req.SampleRate == 0 {
		req.SampleRate = 22050
	}
	if req.Emotion == "" {
		req.Emotion = "neutral"
	}

	// Process text
	response, err := h.ttsService.GenerateSpeech(&req)
	if err != nil {
		h.logger.Errorf("TTS processing failed: %v", err)
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Processing failed",
			Message: "Failed to generate speech",
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    response,
	})
}
