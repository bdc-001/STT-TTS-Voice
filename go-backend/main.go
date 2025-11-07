package main

import (
	"convin-voice-api/internal/config"
	"convin-voice-api/internal/database"
	"convin-voice-api/internal/handlers"
	"convin-voice-api/internal/middleware"
	"convin-voice-api/internal/routes"
	"convin-voice-api/internal/services"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Setup logger
	logger := logrus.New()
	logger.SetLevel(logrus.InfoLevel)

	// Initialize database
	db, err := database.Initialize(cfg.DatabaseURL)
	if err != nil {
		logger.Fatalf("Failed to initialize database: %v", err)
	}

	// Run migrations
	if err := database.Migrate(db); err != nil {
		logger.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize services
	userService := services.NewUserService(db, logger)
	apiKeyService := services.NewAPIKeyService(db, logger)
	sttService := services.NewSTTService(logger)
	ttsService := services.NewTTSService(logger)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(userService, apiKeyService, logger)
	sttHandler := handlers.NewSTTHandler(sttService, apiKeyService, logger)
	ttsHandler := handlers.NewTTSHandler(ttsService, apiKeyService, logger)
	userHandler := handlers.NewUserHandler(userService, apiKeyService, logger)

	// Setup Gin router
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())

	// Setup routes
	routes.SetupRoutes(router, authHandler, sttHandler, ttsHandler, userHandler)

	// Start server
	logger.Infof("Starting server on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
