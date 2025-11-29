package handlers

import (
	"convin-voice-api/internal/database"
	"convin-voice-api/internal/models"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupJobTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&models.User{}, &models.Job{})
	return db
}

func TestJobHandler_GetJob(t *testing.T) {
	// Setup
	db := setupJobTestDB()
	database.DB = db // Inject test DB
	handler := NewJobHandler()

	// Create test user
	user := models.User{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password",
	}
	db.Create(&user)

	// Create test job
	job := models.Job{
		ID:       "job-123",
		UserID:   user.ID,
		Type:     "voice_clone",
		Status:   "completed",
		Progress: 100,
	}
	db.Create(&job)

	// Create request
	req, _ := http.NewRequest("GET", "/api/v1/jobs/job-123", nil)

	// Create response recorder
	w := httptest.NewRecorder()

	// Setup Gin context
	c, _ := gin.CreateTestContext(w)
	c.Request = req
	c.Params = []gin.Param{{Key: "id", Value: "job-123"}}
	c.Set("userID", user.ID)

	// Call handler
	handler.GetJob(c)

	// Assertions
	assert.Equal(t, http.StatusOK, w.Code)

	var response models.SuccessResponse
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.True(t, response.Success)

	// Parse data to map to check fields
	dataMap := response.Data.(map[string]interface{})
	assert.Equal(t, "job-123", dataMap["id"])
	assert.Equal(t, "voice_clone", dataMap["type"])
	assert.Equal(t, "completed", dataMap["status"])
}

func TestJobHandler_ListJobs(t *testing.T) {
	// Setup
	db := setupJobTestDB()
	database.DB = db // Inject test DB
	handler := NewJobHandler()

	// Create test user
	user := models.User{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password",
	}
	db.Create(&user)

	// Create test jobs
	db.Create(&models.Job{
		ID:        "job-1",
		UserID:    user.ID,
		Type:      "voice_clone",
		Status:    "completed",
		CreatedAt: time.Now().Add(-2 * time.Hour),
	})
	db.Create(&models.Job{
		ID:        "job-2",
		UserID:    user.ID,
		Type:      "voice_design",
		Status:    "processing",
		CreatedAt: time.Now().Add(-1 * time.Hour),
	})

	// Create request
	req, _ := http.NewRequest("GET", "/api/v1/jobs", nil)

	// Create response recorder
	w := httptest.NewRecorder()

	// Setup Gin context
	c, _ := gin.CreateTestContext(w)
	c.Request = req
	c.Set("userID", user.ID)

	// Call handler
	handler.ListJobs(c)

	// Assertions
	assert.Equal(t, http.StatusOK, w.Code)

	var response models.SuccessResponse
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.True(t, response.Success)

	// Check that we got a list
	dataList := response.Data.([]interface{})
	assert.Len(t, dataList, 2)

	// Verify order (descending by created_at)
	firstJob := dataList[0].(map[string]interface{})
	assert.Equal(t, "job-2", firstJob["id"])
}
