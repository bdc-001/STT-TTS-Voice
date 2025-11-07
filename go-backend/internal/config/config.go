package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Environment  string
	Port         string
	DatabaseURL  string
	RedisURL     string
	JWTSecret    string
	APIKeySecret string
}

func Load() *Config {
	// Load .env file if it exists
	godotenv.Load()

	return &Config{
		Environment:  getEnv("ENVIRONMENT", "development"),
		Port:         getEnv("PORT", "8080"),
		DatabaseURL:  getEnv("DATABASE_URL", "sqlite://./convin_voice_api.db"),
		RedisURL:     getEnv("REDIS_URL", "redis://localhost:6379"),
		JWTSecret:    getEnv("JWT_SECRET", "your-secret-key"),
		APIKeySecret: getEnv("API_KEY_SECRET", "your-api-key-secret"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}
