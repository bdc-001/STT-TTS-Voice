package handlers

import (
	"bytes"
	"convin-voice-api/internal/models"
	"convin-voice-api/internal/services"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&models.User{}, &models.APIKey{}, &models.Usage{})
	return db
}

func TestAuthHandler_Register(t *testing.T) {
	// Setup
	db := setupTestDB()
	logger := logrus.New()
	logger.SetLevel(logrus.ErrorLevel) // Reduce noise during tests
	userService := services.NewUserService(db, logger)
	apiKeyService := services.NewAPIKeyService(db, logger)
	handler := NewAuthHandler(userService, apiKeyService, logger)

	// Test data
	reqBody := map[string]string{
		"username": "testuser",
		"email":    "test@example.com",
		"password": "password123",
	}
	jsonBody, _ := json.Marshal(reqBody)

	// Create request
	req, _ := http.NewRequest("POST", "/auth/register", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	// Create response recorder
	w := httptest.NewRecorder()

	// Setup Gin context
	c, _ := gin.CreateTestContext(w)
	c.Request = req

	// Call handler
	handler.Register(c)

	// Assertions
	assert.Equal(t, http.StatusCreated, w.Code)

	var response models.SuccessResponse
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.True(t, response.Success)
}

func TestAuthHandler_Login(t *testing.T) {
	// Setup
	db := setupTestDB()
	logger := logrus.New()
	logger.SetLevel(logrus.ErrorLevel) // Reduce noise during tests
	userService := services.NewUserService(db, logger)
	apiKeyService := services.NewAPIKeyService(db, logger)
	handler := NewAuthHandler(userService, apiKeyService, logger)

	// Create test user first
	_, err := userService.CreateUser("testuser", "test@example.com", "password123")
	assert.NoError(t, err)

	// Test data
	reqBody := map[string]string{
		"username": "testuser",
		"password": "password123",
	}
	jsonBody, _ := json.Marshal(reqBody)

	// Create request
	req, _ := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	// Create response recorder
	w := httptest.NewRecorder()

	// Setup Gin context
	c, _ := gin.CreateTestContext(w)
	c.Request = req

	// Call handler
	handler.Login(c)

	// Assertions
	assert.Equal(t, http.StatusOK, w.Code)

	var response models.SuccessResponse
	err = json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.True(t, response.Success)
}
