package handlers

import (
	"convin-voice-api/internal/models"
	"convin-voice-api/internal/services"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type UserHandler struct {
	userService   *services.UserService
	apiKeyService *services.APIKeyService
	logger        *logrus.Logger
}

func NewUserHandler(userService *services.UserService, apiKeyService *services.APIKeyService, logger *logrus.Logger) *UserHandler {
	return &UserHandler{
		userService:   userService,
		apiKeyService: apiKeyService,
		logger:        logger,
	}
}

// GetAPIKeys returns user's API keys
func (h *UserHandler) GetAPIKeys(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "User not authenticated",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	apiKeys, err := h.apiKeyService.GetUserAPIKeys(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal error",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    apiKeys,
	})
}

// CreateAPIKey creates a new API key
func (h *UserHandler) CreateAPIKey(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "User not authenticated",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	var req struct {
		Name        string `json:"name" binding:"required"`
		Permissions string `json:"permissions" binding:"required,oneof=all stt tts"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	apiKey, err := h.apiKeyService.CreateAPIKey(userID.(uint), req.Name, req.Permissions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Creation failed",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusCreated, models.SuccessResponse{
		Success: true,
		Data:    apiKey,
		Message: "API key created successfully",
	})
}

// UpdateAPIKey updates an API key
func (h *UserHandler) UpdateAPIKey(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "User not authenticated",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	keyID := c.Param("id")
	keyIDUint, err := strconv.ParseUint(keyID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid key ID",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	var req struct {
		Name        string `json:"name,omitempty"`
		Permissions string `json:"permissions,omitempty" binding:"omitempty,oneof=all stt tts"`
		IsActive    *bool  `json:"is_active,omitempty"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Get existing API key
	apiKeys, err := h.apiKeyService.GetUserAPIKeys(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal error",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	var apiKey *models.APIKey
	for _, key := range apiKeys {
		if key.ID == uint(keyIDUint) {
			apiKey = &key
			break
		}
	}

	if apiKey == nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error:   "API key not found",
			Message: "API key not found",
			Code:    http.StatusNotFound,
		})
		return
	}

	// Update fields
	if req.Name != "" {
		apiKey.Name = req.Name
	}
	if req.Permissions != "" {
		apiKey.Permissions = req.Permissions
	}
	if req.IsActive != nil {
		apiKey.IsActive = *req.IsActive
	}

	if err := h.apiKeyService.UpdateAPIKey(apiKey); err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Update failed",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    apiKey,
		Message: "API key updated successfully",
	})
}

// DeleteAPIKey deletes an API key
func (h *UserHandler) DeleteAPIKey(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "User not authenticated",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	keyID := c.Param("id")
	keyIDUint, err := strconv.ParseUint(keyID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid key ID",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	// Get existing API key
	apiKeys, err := h.apiKeyService.GetUserAPIKeys(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal error",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	var apiKey *models.APIKey
	for _, key := range apiKeys {
		if key.ID == uint(keyIDUint) {
			apiKey = &key
			break
		}
	}

	if apiKey == nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error:   "API key not found",
			Message: "API key not found",
			Code:    http.StatusNotFound,
		})
		return
	}

	if err := h.apiKeyService.DeleteAPIKey(apiKey.Key); err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Deletion failed",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Message: "API key deleted successfully",
	})
}

// GetUsage returns user's usage statistics
func (h *UserHandler) GetUsage(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "User not authenticated",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Parse date range
	startDateStr := c.DefaultQuery("start_date", "")
	endDateStr := c.DefaultQuery("end_date", "")

	var startDate, endDate time.Time
	var err error

	if startDateStr != "" {
		startDate, err = time.Parse("2006-01-02", startDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{
				Error:   "Invalid start date",
				Message: "Date must be in YYYY-MM-DD format",
				Code:    http.StatusBadRequest,
			})
			return
		}
	}

	if endDateStr != "" {
		endDate, err = time.Parse("2006-01-02", endDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{
				Error:   "Invalid end date",
				Message: "Date must be in YYYY-MM-DD format",
				Code:    http.StatusBadRequest,
			})
			return
		}
	}

	usage, err := h.userService.GetUserUsage(userID.(uint), startDate, endDate)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal error",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	// Calculate summary statistics
	var totalSTTMinutes float64
	var totalTTSCharacters int64
	var totalCost float64

	for _, u := range usage {
		if u.Type == "stt" {
			totalSTTMinutes += float64(u.Amount) / 60.0 // Convert seconds to minutes
		} else if u.Type == "tts" {
			totalTTSCharacters += u.Amount
		}
		totalCost += u.Cost
	}

	summary := gin.H{
		"total_stt_minutes":    totalSTTMinutes,
		"total_tts_characters": totalTTSCharacters,
		"total_cost":           totalCost,
		"usage_count":          len(usage),
		"usage":                usage,
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    summary,
	})
}
