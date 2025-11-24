package handlers

import (
	"convin-voice-api/internal/database"
	"convin-voice-api/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type JobHandler struct{}

func NewJobHandler() *JobHandler {
	return &JobHandler{}
}

// GetJob returns the status of a specific job
func (h *JobHandler) GetJob(c *gin.Context) {
	jobID := c.Param("id")
	userID := c.GetUint("userID")

	var job models.Job
	if err := database.DB.Where("id = ? AND user_id = ?", jobID, userID).First(&job).Error; err != nil {
		c.JSON(http.StatusNotFound, models.ErrorResponse{
			Error:   "Not Found",
			Message: "Job not found",
			Code:    http.StatusNotFound,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    job,
	})
}

// ListJobs returns a list of jobs for the user
func (h *JobHandler) ListJobs(c *gin.Context) {
	userID := c.GetUint("userID")

	var jobs []models.Job
	if err := database.DB.Where("user_id = ?", userID).Order("created_at desc").Limit(20).Find(&jobs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "Internal Server Error",
			Message: "Failed to fetch jobs",
			Code:    http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{
		Success: true,
		Data:    jobs,
	})
}
