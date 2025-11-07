package routes

import (
	"convin-voice-api/internal/handlers"
	"convin-voice-api/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	router *gin.Engine,
	authHandler *handlers.AuthHandler,
	sttHandler *handlers.STTHandler,
	ttsHandler *handlers.TTSHandler,
	userHandler *handlers.UserHandler,
) {
	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "convin-voice-api",
		})
	})

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Public routes (no authentication required)
		public := v1.Group("/")
		{
			// Authentication
			public.POST("/auth/register", authHandler.Register)
			public.POST("/auth/login", authHandler.Login)

			// STT info endpoints
			public.GET("/stt/languages", sttHandler.GetSupportedLanguages)
			public.GET("/stt/formats", sttHandler.GetSupportedFormats)

			// TTS info endpoints
			public.GET("/tts/voices", ttsHandler.GetVoices)
			public.GET("/tts/voices/:id", ttsHandler.GetVoice)
			public.GET("/tts/languages", ttsHandler.GetSupportedLanguages)
			public.GET("/tts/formats", ttsHandler.GetSupportedFormats)
		}

		// Protected routes (require JWT authentication)
		protected := v1.Group("/")
		protected.Use(middleware.JWTAuth("your-jwt-secret"))
		{
			// User profile
			protected.GET("/profile", authHandler.GetProfile)
			protected.PUT("/profile", authHandler.UpdateProfile)

			// API key management
			protected.GET("/api-keys", userHandler.GetAPIKeys)
			protected.POST("/api-keys", userHandler.CreateAPIKey)
			protected.PUT("/api-keys/:id", userHandler.UpdateAPIKey)
			protected.DELETE("/api-keys/:id", userHandler.DeleteAPIKey)

			// Usage statistics
			protected.GET("/usage", userHandler.GetUsage)
		}

		// API key protected routes
		apiKeyProtected := v1.Group("/")
		apiKeyProtected.Use(middleware.APIKeyAuth(nil))
		{
			// STT endpoints
			apiKeyProtected.POST("/stt/transcribe", middleware.MaxSizeLimit(50*1024*1024), sttHandler.Transcribe) // 50MB limit
			apiKeyProtected.GET("/stt/stream", sttHandler.StreamTranscribe)

			// TTS endpoints
			apiKeyProtected.POST("/tts/generate", middleware.MaxSizeLimit(10*1024*1024), ttsHandler.GenerateSpeech)          // 10MB limit
			apiKeyProtected.POST("/tts/generate-json", middleware.MaxSizeLimit(10*1024*1024), ttsHandler.GenerateSpeechJSON) // 10MB limit
		}
	}

	// WebSocket routes for real-time streaming
	router.GET("/ws/stt", sttHandler.StreamTranscribe)
}
