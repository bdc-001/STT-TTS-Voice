package handlers

import (
	"convin-voice-api/internal/database"
	"convin-voice-api/internal/models"
	"convin-voice-api/internal/services"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
)

type TTSHandler struct {
	ttsService    *services.TTSService
	apiKeyService *services.APIKeyService
	logger        *logrus.Logger
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

// GetVoices returns available voices (system + user custom voices)
func (h *TTSHandler) GetVoices(c *gin.Context) {
	// Get system voices
	voices := h.ttsService.GetAvailableVoices() // Changed from GetVoices() to GetAvailableVoices() to match existing service method

	// If user is authenticated, get their custom voices
	userID, exists := c.Get("userID")
	if exists {
		var customVoices []models.CustomVoice
		if err := database.DB.Where("user_id = ? AND is_active = ?", userID, true).Find(&customVoices).Error; err == nil {
			for _, cv := range customVoices {
				voices = append(voices, models.Voice{
					ID:          cv.ID,
					Name:        cv.Name,
					Gender:      cv.Gender,
					Language:    cv.Language,
					Accent:      cv.Accent,
					Description: cv.Description,
					SampleURL:   cv.PreviewURL,
					IsActive:    cv.IsActive,
				})
			}
		}
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    voices,
	})
}

// CloneVoice initiates a voice cloning job
func (h *TTSHandler) CloneVoice(c *gin.Context) {
	userID := c.GetUint("userID")

	// Parse multipart form
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Bad Request",
			Message: "Invalid form data",
			Code:    http.StatusBadRequest,
		})
		return
	}

	files := form.File["file"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Bad Request",
			Message: "Audio file is required",
			Code:    http.StatusBadRequest,
		})
		return
	}

	name := c.PostForm("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Bad Request",
			Message: "Voice name is required",
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Create a new Job
	jobID := uuid.New().String()
	job := models.Job{
		ID:       jobID,
		UserID:   userID,
		Type:     "voice_clone",
		Status:   "pending",
		Progress: 0,
	}

	if err := database.DB.Create(&job).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Failed to create job",
			Code:    http.StatusInternalServerError,
		})
		return
	}

	// Simulate async processing (in a real app, this would go to a queue)
	go func() {
		// Simulate processing time
		time.Sleep(2 * time.Second)

		// Update job status
		database.DB.Model(&job).Updates(map[string]interface{}{
			"status":   "processing",
			"progress": 50,
		})

		time.Sleep(2 * time.Second)

		// Create the custom voice
		voiceID := "custom-" + uuid.New().String()[:8]
		customVoice := models.CustomVoice{
			ID:          voiceID,
			UserID:      userID,
			Name:        name,
			Description: "Cloned voice from " + files[0].Filename,
			Category:    "cloned",
			Gender:      "unknown", // Would be detected
			Language:    "en-US",   // Default
			IsActive:    true,
		}

		database.DB.Create(&customVoice)

		// Complete job
		database.DB.Model(&job).Updates(map[string]interface{}{
			"status":   "completed",
			"progress": 100,
			"result":   []byte(`{"voice_id": "` + voiceID + `"}`),
		})
	}()

	c.JSON(http.StatusAccepted, models.SuccessResponse{
		Success: true,
		Data:    gin.H{"job_id": jobID},
		Message: "Voice cloning job started",
	})
}

// DesignVoice initiates a voice design job
func (h *TTSHandler) DesignVoice(c *gin.Context) {
	var req struct {
		Prompt   string `json:"prompt"`
		Name     string `json:"name"`
		Category string `json:"category"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Bad Request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	userID := c.GetUint("userID")
	jobID := uuid.New().String()

	job := models.Job{
		ID:       jobID,
		UserID:   userID,
		Type:     "voice_design",
		Status:   "pending",
		Progress: 0,
	}

	if err := database.DB.Create(&job).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Failed to create job",
			Code:    http.StatusInternalServerError,
		})
		return
	}

	// Simulate async processing
	go func() {
		time.Sleep(3 * time.Second)

		voiceID := "designed-" + uuid.New().String()[:8]
		customVoice := models.CustomVoice{
			ID:          voiceID,
			UserID:      userID,
			Name:        req.Name,
			Description: req.Prompt,
			Category:    req.Category,
			Gender:      "female", // Simulated
			Language:    "en-US",
			IsActive:    true,
		}

		database.DB.Create(&customVoice)

		database.DB.Model(&job).Updates(map[string]interface{}{
			"status":   "completed",
			"progress": 100,
			"result":   []byte(`{"voice_id": "` + voiceID + `"}`),
		})
	}()

	c.JSON(http.StatusAccepted, models.SuccessResponse{
		Success: true,
		Data:    gin.H{"job_id": jobID},
		Message: "Voice design job started",
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
