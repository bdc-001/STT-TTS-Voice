# Convin Voice Intelligence Platform

The Convin Voice Intelligence Platform is a comprehensive voice AI suite that enables users to transcribe (STT), synthesize (TTS), analyze emotions, and deploy voice solutions seamlessly.

This repository contains the full stack application, consisting of a React frontend and a Go backend.

## 📁 Architecture

The project is structured into three main components:

-   **Client (`/client`)**: A React + Vite frontend application.
-   **Server (`/server`)**: A Node.js/Express proxy server for the frontend.
-   **Backend (`/go-backend`)**: A high-performance Go API server handling STT, TTS, and authentication.

## 🚀 Quick Start

### Prerequisites

-   **Node.js** (v20+)
-   **Go** (v1.21+)
-   **Docker** (Optional, for easy backend setup)

### 1. Start the Backend

You can run the backend using Docker Compose or manually with Go.

**Option A: Docker (Recommended)**

```bash
cd go-backend
docker-compose up -d
```

**Option B: Manual**

```bash
cd go-backend
# Copy environment variables
cp env.example .env
# Run the server
go run main.go
```

The backend API will start at `http://localhost:8080`.

### 2. Start the Frontend

The frontend communicates with the backend via the Node.js proxy server.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5000`.

## 📚 Documentation

For more detailed information, please refer to the specific documentation for each component:

-   **[Frontend Documentation](./PLATFORM_README.md)**: Details on the UI architecture, modules, and design system.
-   **[Backend Documentation](./go-backend/README.md)**: specific API endpoints, configuration, and architecture of the Go service.

## 🛠 Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, ShadCN UI
-   **Backend**: Go (Golang), PostgreSQL, Redis, WebSocket
-   **Proxy**: Express.js
