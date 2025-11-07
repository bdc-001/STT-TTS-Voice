package services

import (
	"convin-voice-api/internal/models"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"gorm.io/gorm"
	"github.com/sirupsen/logrus"
)

type APIKeyService struct {
	db     *gorm.DB
	logger *logrus.Logger
}

func NewAPIKeyService(db *gorm.DB, logger *logrus.Logger) *APIKeyService {
	return &APIKeyService{
		db:     db,
		logger: logger,
	}
}

func (s *APIKeyService) GenerateAPIKey() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func (s *APIKeyService) CreateAPIKey(userID uint, name, permissions string) (*models.APIKey, error) {
	key, err := s.GenerateAPIKey()
	if err != nil {
		return nil, err
	}

	apiKey := &models.APIKey{
		UserID:      userID,
		Key:         key,
		Name:        name,
		Permissions: permissions,
		IsActive:    true,
	}

	if err := s.db.Create(apiKey).Error; err != nil {
		return nil, err
	}

	s.logger.Infof("API key created for user %d: %s", userID, name)
	return apiKey, nil
}

func (s *APIKeyService) GetAPIKey(key string) (*models.APIKey, error) {
	var apiKey models.APIKey
	if err := s.db.Preload("User").Where("key = ? AND is_active = ?", key, true).First(&apiKey).Error; err != nil {
		return nil, err
	}
	return &apiKey, nil
}

func (s *APIKeyService) GetUserAPIKeys(userID uint) ([]models.APIKey, error) {
	var apiKeys []models.APIKey
	if err := s.db.Where("user_id = ?", userID).Find(&apiKeys).Error; err != nil {
		return nil, err
	}
	return apiKeys, nil
}

func (s *APIKeyService) UpdateAPIKey(apiKey *models.APIKey) error {
	return s.db.Save(apiKey).Error
}

func (s *APIKeyService) DeactivateAPIKey(key string) error {
	return s.db.Model(&models.APIKey{}).Where("key = ?", key).Update("is_active", false).Error
}

func (s *APIKeyService) DeleteAPIKey(key string) error {
	return s.db.Where("key = ?", key).Delete(&models.APIKey{}).Error
}

func (s *APIKeyService) UpdateLastUsed(key string) error {
	now := time.Now()
	return s.db.Model(&models.APIKey{}).Where("key = ?", key).Update("last_used_at", now).Error
}

func (s *APIKeyService) ValidateAPIKey(key string) (*models.APIKey, error) {
	apiKey, err := s.GetAPIKey(key)
	if err != nil {
		return nil, errors.New("invalid API key")
	}

	// Update last used timestamp
	s.UpdateLastUsed(key)

	return apiKey, nil
}

func (s *APIKeyService) HasPermission(apiKey *models.APIKey, permission string) bool {
	if apiKey.Permissions == "all" {
		return true
	}
	return apiKey.Permissions == permission
}
