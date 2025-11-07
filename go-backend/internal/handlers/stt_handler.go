package handlers

import (
	"convin-voice-api/internal/models"
	"convin-voice-api/internal/services"
	"io"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for development
	},
}

type STTHandler struct {
	sttService    *services.STTService
	apiKeyService *services.APIKeyService
	logger        *logrus.Logger
}

func NewSTTHandler(sttService *services.STTService, apiKeyService *services.APIKeyService, logger *logrus.Logger) *STTHandler {
	return &STTHandler{
		sttService:    sttService,
		apiKeyService: apiKeyService,
		logger:        logger,
	}
}

// Transcribe handles batch transcription requests
func (h *STTHandler) Transcribe(c *gin.Context) {
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
	if !h.apiKeyService.HasPermission(keyInfo, "all") && !h.apiKeyService.HasPermission(keyInfo, "stt") {
		c.JSON(http.StatusForbidden, models.ErrorResponse{
			Error:   "Forbidden",
			Message: "Insufficient permissions for STT",
			Code:    http.StatusForbidden,
		})
		return
	}

	// Parse form data
	file, header, err := c.Request.FormFile("audio")
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: "Audio file required",
			Code:    http.StatusBadRequest,
		})
		return
	}
	defer file.Close()

	// Read audio data
	audioData, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: "Failed to read audio file",
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Parse parameters
	language := c.DefaultPostForm("language", "en-US")
	format := c.DefaultPostForm("format", "wav")
	enableDiarization := c.DefaultPostForm("enable_diarization", "false") == "true"
	enablePunctuation := c.DefaultPostForm("enable_punctuation", "true") == "true"
	enableProfanityFilter := c.DefaultPostForm("enable_profanity_filter", "false") == "true"

	// Parse sample rate and channels
	sampleRate := 16000
	if sr := c.PostForm("sample_rate"); sr != "" {
		if parsed, err := strconv.Atoi(sr); err == nil {
			sampleRate = parsed
		}
	}

	channels := 1
	if ch := c.PostForm("channels"); ch != "" {
		if parsed, err := strconv.Atoi(ch); err == nil {
			channels = parsed
		}
	}

	// Create STT request
	req := &models.STTRequest{
		AudioData:             audioData,
		Language:              language,
		Format:                format,
		SampleRate:            sampleRate,
		Channels:              channels,
		EnableDiarization:     enableDiarization,
		EnablePunctuation:     enablePunctuation,
		EnableProfanityFilter: enableProfanityFilter,
		Metadata: map[string]string{
			"filename": header.Filename,
			"size":     strconv.FormatInt(header.Size, 10),
		},
	}

	// Process audio
	response, err := h.sttService.ProcessAudio(req)
	if err != nil {
		h.logger.Errorf("STT processing failed: %v", err)
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Processing failed",
			Message: "Failed to process audio",
			Code:    http.StatusInternalServerError,
		})
		return
	}

	// TODO: Track usage
	// h.trackUsage(keyInfo.UserID, keyInfo.ID, "stt", response.Duration)

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    response,
	})
}

// GetSupportedLanguages returns supported languages
func (h *STTHandler) GetSupportedLanguages(c *gin.Context) {
	languages := h.sttService.GetSupportedLanguages()
	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    languages,
	})
}

// GetSupportedFormats returns supported audio formats
func (h *STTHandler) GetSupportedFormats(c *gin.Context) {
	formats := h.sttService.GetSupportedFormats()
	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    formats,
	})
}

// StreamTranscribe handles streaming transcription via WebSocket
func (h *STTHandler) StreamTranscribe(c *gin.Context) {
	// Upgrade to WebSocket
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		h.logger.Errorf("WebSocket upgrade failed: %v", err)
		return
	}
	defer conn.Close()

	// Get API key from query parameters
	apiKey := c.Query("api_key")
	if apiKey == "" {
		conn.WriteJSON(models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "API key required",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Validate API key
	keyInfo, err := h.apiKeyService.ValidateAPIKey(apiKey)
	if err != nil {
		conn.WriteJSON(models.ErrorResponse{
			Error:   "Invalid API key",
			Message: err.Error(),
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Check permissions
	if !h.apiKeyService.HasPermission(keyInfo, "all") && !h.apiKeyService.HasPermission(keyInfo, "stt") {
		conn.WriteJSON(models.ErrorResponse{
			Error:   "Forbidden",
			Message: "Insufficient permissions for STT",
			Code:    http.StatusForbidden,
		})
		return
	}

	language := c.DefaultQuery("language", "en-US")

	h.logger.Infof("WebSocket STT connection established for user %d", keyInfo.UserID)

	// Handle WebSocket messages
	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			h.logger.Errorf("WebSocket read error: %v", err)
			break
		}

		if messageType == websocket.BinaryMessage {
			// Process audio chunk
			response, err := h.sttService.ProcessStreamingAudio(message, language)
			if err != nil {
				h.logger.Errorf("Streaming STT processing failed: %v", err)
				conn.WriteJSON(models.ErrorResponse{
					Error:   "Processing failed",
					Message: err.Error(),
					Code:    http.StatusInternalServerError,
				})
				continue
			}

			// Send response back
			if err := conn.WriteJSON(response); err != nil {
				h.logger.Errorf("WebSocket write error: %v", err)
				break
			}
		}
	}
}
