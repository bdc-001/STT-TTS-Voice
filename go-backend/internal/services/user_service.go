package services

import (
	"convin-voice-api/internal/models"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"github.com/sirupsen/logrus"
)

type UserService struct {
	db     *gorm.DB
	logger *logrus.Logger
}

func NewUserService(db *gorm.DB, logger *logrus.Logger) *UserService {
	return &UserService{
		db:     db,
		logger: logger,
	}
}

func (s *UserService) CreateUser(username, email, password string) (*models.User, error) {
	// Check if user already exists
	var existingUser models.User
	if err := s.db.Where("username = ? OR email = ?", username, email).First(&existingUser).Error; err == nil {
		return nil, errors.New("user already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Create user
	user := &models.User{
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
	}

	if err := s.db.Create(user).Error; err != nil {
		return nil, err
	}

	s.logger.Infof("User created: %s", username)
	return user, nil
}

func (s *UserService) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	if err := s.db.Preload("APIKeys").First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	if err := s.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := s.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) ValidatePassword(user *models.User, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}

func (s *UserService) UpdateUser(user *models.User) error {
	return s.db.Save(user).Error
}

func (s *UserService) DeleteUser(id uint) error {
	return s.db.Delete(&models.User{}, id).Error
}

func (s *UserService) GetUserUsage(userID uint, startDate, endDate time.Time) ([]models.Usage, error) {
	var usage []models.Usage
	query := s.db.Where("user_id = ?", userID)
	
	if !startDate.IsZero() {
		query = query.Where("created_at >= ?", startDate)
	}
	if !endDate.IsZero() {
		query = query.Where("created_at <= ?", endDate)
	}
	
	if err := query.Find(&usage).Error; err != nil {
		return nil, err
	}
	return usage, nil
}
