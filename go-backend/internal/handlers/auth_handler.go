package handlers

import (
	"convin-voice-api/internal/models"
	"convin-voice-api/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	userService   *services.UserService
	apiKeyService *services.APIKeyService
	logger        *logrus.Logger
}

func NewAuthHandler(userService *services.UserService, apiKeyService *services.APIKeyService, logger *logrus.Logger) *AuthHandler {
	return &AuthHandler{
		userService:   userService,
		apiKeyService: apiKeyService,
		logger:        logger,
	}
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var req struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	user, err := h.userService.CreateUser(req.Username, req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusConflict, models.ErrorResponse{
			Error:   "Registration failed",
			Message: err.Error(),
			Code:    http.StatusConflict,
		})
		return
	}

	// Create default API key
	apiKey, err := h.apiKeyService.CreateAPIKey(user.ID, "Default", "all")
	if err != nil {
		h.logger.Errorf("Failed to create default API key for user %d: %v", user.ID, err)
	}

	c.JSON(http.StatusCreated, models.SuccessResponse{
		Success: true,
		Data: gin.H{
			"user": gin.H{
				"id":         user.ID,
				"username":   user.Username,
				"email":      user.Email,
				"created_at": user.CreatedAt,
			},
			"api_key": apiKey.Key,
		},
		Message: "User registered successfully",
	})
}

// Login handles user login
func (h *AuthHandler) Login(c *gin.Context) {
	var req struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	user, err := h.userService.GetUserByUsername(req.Username)
	if err != nil {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Authentication failed",
			Message: "Invalid username or password",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	if !h.userService.ValidatePassword(user, req.Password) {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Authentication failed",
			Message: "Invalid username or password",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	// Get user's API keys
	apiKeys, err := h.apiKeyService.GetUserAPIKeys(user.ID)
	if err != nil {
		h.logger.Errorf("Failed to get API keys for user %d: %v", user.ID, err)
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data: gin.H{
			"user": gin.H{
				"id":         user.ID,
				"username":   user.Username,
				"email":      user.Email,
				"created_at": user.CreatedAt,
			},
			"api_keys": apiKeys,
		},
		Message: "Login successful",
	})
}

// GetProfile returns user profile
func (h *AuthHandler) GetProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "Unauthorized",
			Message: "User not authenticated",
			Code:    http.StatusUnauthorized,
		})
		return
	}

	user, err := h.userService.GetUserByID(userID.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error:   "User not found",
			Message: err.Error(),
			Code:    http.StatusNotFound,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data: gin.H{
			"id":         user.ID,
			"username":   user.Username,
			"email":      user.Email,
			"created_at": user.CreatedAt,
			"updated_at": user.UpdatedAt,
		},
	})
}

// UpdateProfile updates user profile
func (h *AuthHandler) UpdateProfile(c *gin.Context) {
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
		Email    string `json:"email,omitempty"`
		Password string `json:"password,omitempty"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
		return
	}

	user, err := h.userService.GetUserByID(userID.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error:   "User not found",
			Message: err.Error(),
			Code:    http.StatusNotFound,
		})
		return
	}

	// Update fields if provided
	if req.Email != "" {
		user.Email = req.Email
	}
	if req.Password != "" {
		// Hash new password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{
				Error:   "Internal error",
				Message: "Failed to hash password",
				Code:    http.StatusInternalServerError,
			})
			return
		}
		user.Password = string(hashedPassword)
	}

	if err := h.userService.UpdateUser(user); err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Update failed",
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data: gin.H{
			"id":         user.ID,
			"username":   user.Username,
			"email":      user.Email,
			"updated_at": user.UpdatedAt,
		},
		Message: "Profile updated successfully",
	})
}
