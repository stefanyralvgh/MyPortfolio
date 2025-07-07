# Setup Guide

This guide will help you set up the Interactive Portfolio backend locally.

## Prerequisites

- Ruby 3.0+
- Rails 7.0+
- PostgreSQL 12+
- Node.js (for frontend integration)

## Quick Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd MyPortfolio/backend
```

### 2. Install dependencies

```bash
bundle install
```

### 3. Set up environment variables

Create a `.env` file in the backend directory with the following variables:

```bash
# Database Configuration
DATABASE_NAME=interactive_portfolio_development
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432

# Rails Configuration
RAILS_ENV=development
SECRET_KEY_BASE=your_secret_key_here

# API Configuration
API_BASE_URL=http://localhost:3000
```

### 4. Set up the database

```bash
./bin/rails db:create
./bin/rails db:migrate
./bin/rails db:seed
```

### 5. Start the server

```bash
./bin/rails server
```

The API will be available at `http://localhost:3000`

## Environment Variables

| Variable            | Description       | Default                             |
| ------------------- | ----------------- | ----------------------------------- |
| `DATABASE_NAME`     | Database name     | `interactive_portfolio_development` |
| `DATABASE_USERNAME` | Database username | `postgres`                          |
| `DATABASE_PASSWORD` | Database password | `admin`                             |
| `DATABASE_HOST`     | Database host     | `127.0.0.1`                         |
| `DATABASE_PORT`     | Database port     | `5432`                              |
| `RAILS_ENV`         | Rails environment | `development`                       |
| `SECRET_KEY_BASE`   | Rails secret key  | Required for production             |

## Troubleshooting

### Database connection issues

- Make sure PostgreSQL is running
- Verify your database credentials
- Check if the database exists

### Permission issues

- Ensure you have the correct permissions for the database user
- Check file permissions in the project directory

## Security Notes

- Never commit your `.env` file to version control
- Use strong passwords in production
- Keep your `SECRET_KEY_BASE` secure
