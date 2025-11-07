# Makefile for Convin Voice API Go Backend

.PHONY: help build run test clean docker-build docker-run docker-compose-up docker-compose-down

# Default target
help:
	@echo "Available commands:"
	@echo "  build              - Build the application"
	@echo "  run                - Run the application"
	@echo "  test               - Run tests"
	@echo "  clean              - Clean build artifacts"
	@echo "  docker-build       - Build Docker image"
	@echo "  docker-run         - Run Docker container"
	@echo "  docker-compose-up  - Start all services with Docker Compose"
	@echo "  docker-compose-down- Stop all services"
	@echo "  dev                - Start development environment"
	@echo "  migrate            - Run database migrations"

# Build the application
build:
	@echo "Building application..."
	go build -o bin/convin-voice-api main.go

# Run the application
run:
	@echo "Running application..."
	go run main.go

# Run tests
test:
	@echo "Running tests..."
	go test -v ./...

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf bin/
	go clean

# Build Docker image
docker-build:
	@echo "Building Docker image..."
	docker build -t convin-voice-api .

# Run Docker container
docker-run:
	@echo "Running Docker container..."
	docker run -p 8080:8080 \
		-e DATABASE_URL=postgres://user:password@localhost:5432/convin_voice_api?sslmode=disable \
		-e REDIS_URL=redis://localhost:6379 \
		convin-voice-api

# Start all services with Docker Compose
docker-compose-up:
	@echo "Starting all services with Docker Compose..."
	docker-compose up -d

# Stop all services
docker-compose-down:
	@echo "Stopping all services..."
	docker-compose down

# Start development environment
dev: docker-compose-up
	@echo "Development environment started!"
	@echo "API available at: http://localhost:8080"
	@echo "PostgreSQL available at: localhost:5432"
	@echo "Redis available at: localhost:6379"

# Run database migrations
migrate:
	@echo "Running database migrations..."
	@echo "Note: Migrations are automatically run on application startup"

# Install dependencies
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

# Format code
fmt:
	@echo "Formatting code..."
	go fmt ./...

# Lint code
lint:
	@echo "Linting code..."
	golangci-lint run

# Generate API documentation
docs:
	@echo "Generating API documentation..."
	@echo "API documentation is available in the README.md file"

# Check for security vulnerabilities
security:
	@echo "Checking for security vulnerabilities..."
	go list -json -deps ./... | nancy sleuth

# Performance testing
benchmark:
	@echo "Running performance benchmarks..."
	go test -bench=. ./...

# Coverage testing
coverage:
	@echo "Running tests with coverage..."
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report generated: coverage.html"
