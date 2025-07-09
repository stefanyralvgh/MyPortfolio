# Interactive Portfolio - Backend

A Ruby on Rails API backend for an interactive portfolio that showcases projects and technical challenges through gamified levels. The backend provides multilingual support (English, Spanish, French) and serves as the data layer for the frontend application.

## Features

- **RESTful API**: Complete REST API for projects and levels
- **Multilingual Content**: JSONB fields for projects and levels content (EN, ES, FR)
- **Gamified Experience**: Interactive levels with questions and explanations
- **Modular Architecture**: Reusable concerns for common functionality
- **PostgreSQL**: Robust database with JSONB support for flexible data structures
- **CORS Support**: Configured for frontend integration

## Architecture

### Models

#### Project Model

- **Multilingual fields**: `title`, `role`, `tech`, `description`, `status`, `link`
- **Concerns included**: `Multilingual`, `Timestampable`, `Searchable`
- **Features**:
  - Automatic language fallback (EN → ES → FR)
  - Search across all languages
  - Display methods for each field

#### Level Model

- **Multilingual fields**: `titles`, `descriptions`, `question`, `options`, `explanation`
- **Game mechanics**: Multiple choice questions with A/B options
- **Concerns included**: `Timestampable`, `Searchable`
- **Features**:
  - Interactive challenge system
  - Progress tracking capabilities
  - Multilingual question/answer system

### Concerns (Reusable Modules)

#### Multilingual Concern

- Validates presence of required languages (EN, ES, FR)
- Ensures data consistency across translations
- Configurable field list per model

#### Timestampable Concern

- Provides scopes: `recent`, `recently_updated`
- Utility methods: `days_since_creation`, `recently_created?`
- Automatic timestamp management

#### Searchable Concern

- Language-specific search: `search_by_language(query, language)`
- Global search: `search_all_languages(query)`
- Configurable searchable fields per model

## Setup & Installation

### Prerequisites

- Ruby 3.0+
- Rails 7.0+
- PostgreSQL 12+
- Node.js (for frontend integration)

### Quick Start

1. **Clone and navigate**:

   ```bash
   git clone <repository-url>
   cd MyPortfolio/backend
   ```

2. **Install dependencies**:

   ```bash
   bundle install
   ```

3. **Database setup**:

   ```bash
   ./bin/rails db:create
   ./bin/rails db:migrate
   ./bin/rails db:seed
   ```

4. **Start the server**:
   ```bash
   ./bin/rails server
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Projects

```
GET /projects.json
GET /projects.json?language=es
```

**Response structure**:

```json
[
  {
    "id": 1,
    "title": "Project Name",
    "role": "Full Stack Developer",
    "tech": "React, Node.js, PostgreSQL",
    "description": "Project description...",
    "status": "Completed",
    "link": "https://project-url.com",
    "created_at": "2025-07-06T...",
    "updated_at": "2025-07-06T..."
  }
]
```

### Levels

```
GET /levels.json
GET /levels.json?language=fr
```

**Response structure**:

```json
[
  {
    "id": 101,
    "titles": "Authentication Madness",
    "descriptions": "Learn how I debugged...",
    "question": "What did I do when...?",
    "options": {
      "A": "First option text",
      "B": "Second option text"
    },
    "correct_option": "B",
    "explanation": "Detailed explanation..."
  }
]
```

## Database Structure

### Projects Table

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{}',
  role JSONB NOT NULL DEFAULT '{}',
  tech JSONB NOT NULL DEFAULT '{}',
  description JSONB NOT NULL DEFAULT '{}',
  status JSONB NOT NULL DEFAULT '{}',
  link JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Levels Table

```sql
CREATE TABLE levels (
  id SERIAL PRIMARY KEY,
  titles JSONB NOT NULL DEFAULT '{}',
  descriptions JSONB NOT NULL DEFAULT '{}',
  question JSONB NOT NULL DEFAULT '{}',
  options JSONB NOT NULL DEFAULT '{}',
  correct_option VARCHAR NOT NULL,
  explanation JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Multilingual Content

The backend provides multilingual content for projects and levels through JSONB fields. This includes:

**Projects**: title, role, tech, description, status, link
**Levels**: titles, descriptions, question, options, explanation

Supported languages:

- **English (en)**: Primary language
- **Spanish (es)**: Secondary language
- **French (fr)**: Tertiary language

_Note: UI elements and system messages are handled by the frontend application._

### Language Fallback System

1. Requested language
2. English (fallback)
3. "Not available" message

### Example JSONB Structure

```json
{
  "en": "English text",
  "es": "Texto en español",
  "fr": "Texte en français"
}
```

## Search Functionality

### Project Search

```ruby
# Search in specific language
Project.search_by_language("Node.js", "en")

# Search across all languages
Project.search_all_languages("AWS")

# Search by technology
Project.by_tech("React")
```

### Level Search

```ruby
# Search in level content
Level.search_all_languages("authentication")
Level.search_by_language("endpoint", "es")
```

## Development

### Console Access

```bash
./bin/rails console
```

### Database Reset

```bash
./bin/rails db:reset
```

### Seed Data

```bash
# Load all seeds
./bin/rails db:seed

# Load specific seeds
load 'db/seeds_levels.rb'
load 'db/seeds_projects.rb'
```

### Testing

```bash
./bin/rails test
```

## Project Structure

```
backend/
├── app/
│   ├── controllers/
│   │   ├── projects_controller.rb
│   │   └── levels_controller.rb
│   ├── models/
│   │   ├── concerns/
│   │   │   ├── multilingual.rb
│   │   │   ├── searchable.rb
│   │   │   └── timestampable.rb
│   │   ├── project.rb
│   │   └── level.rb
│   └── views/
├── db/
│   ├── seeds.rb
│   ├── seeds_projects.rb
│   └── seeds_levels.rb
└── config/
    ├── database.yml
    └── routes.rb
```

## Configuration

### Environment Variables

- `DATABASE_NAME`: Database name
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `DATABASE_HOST`: Database host
- `DATABASE_PORT`: Database port
- `RAILS_ENV`: Environment (development/production)
- `SECRET_KEY_BASE`: Rails secret key (required for production)

### CORS Configuration

Configured in `config/initializers/cors.rb` for frontend integration.

### Security

- All sensitive data is stored in environment variables
- Database credentials are not hardcoded
- See `SETUP.md` for local development instructions

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please contact the maintainer directly.
