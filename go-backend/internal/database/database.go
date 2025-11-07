package database

import (
	"convin-voice-api/internal/models"
	"fmt"
	"log"
	"strings"

	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Initialize(databaseURL string) (*gorm.DB, error) {
	var err error

	// Configure GORM logger
	config := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	// Connect to database based on URL scheme
	if strings.HasPrefix(databaseURL, "sqlite://") {
		dbPath := strings.TrimPrefix(databaseURL, "sqlite://")
		DB, err = gorm.Open(sqlite.Open(dbPath), config)
	} else {
		DB, err = gorm.Open(postgres.Open(databaseURL), config)
	}

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Test the connection
	sqlDB, err := DB.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database instance: %w", err)
	}

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Database connected successfully")
	return DB, nil
}

func Migrate(db *gorm.DB) error {
	// Auto-migrate all models
	err := db.AutoMigrate(
		&models.User{},
		&models.APIKey{},
		&models.Usage{},
	)
	if err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Println("Database migrations completed successfully")
	return nil
}

func Close() error {
	if DB != nil {
		sqlDB, err := DB.DB()
		if err != nil {
			return err
		}
		return sqlDB.Close()
	}
	return nil
}
