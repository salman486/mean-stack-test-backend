# Auth API Application

This repository contains an authentication API built with Node.js and MongoDB. The application is containerized using Docker and can be easily set up and run using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Git**: For cloning the repository. Download from [here](https://git-scm.com/downloads).
- **Docker**: Download and install from the [official website](https://www.docker.com/get-started).
- **Docker Compose**: Usually comes with Docker installations. Verify by running `docker-compose --version`.

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### Clone the Repository

```bash
git clone https://github.com/salman486/mean-stack-test-backend.git
cd mean-stack-test-backend
```

# .env file

NODE_ENV=development
SERVER_PORT=3000
GITHUB_CLIENT_ID=<client-id-here>
GITHUB_CLIENT_SECRET=<client-secret-here>
SESSION_SECRET=nope
API_URL=http://localhost:3000
SITE_URL=http://localhost:4200
COOKIE_DOMAIN=localhost
DB_NAME=auth
MONGO_INITDB_ROOT_USERNAME=auth
MONGO_INITDB_ROOT_PASSWORD=123456
DB_CONNECTION_STRING=mongodb://auth:123456@mongodb:27017

use below if running node app outside docker
DB_CONNECTION_STRING=mongodb://auth:123456@localhost:27017

# Running the Application

Use Docker Compose to build and run the application.

```bash
docker compose up -d auth-api
```

# Stopping the Application

```bash
docker compose down
```
