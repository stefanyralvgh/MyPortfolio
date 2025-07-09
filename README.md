# Interactive Portfolio

Welcome to my interactive portfolio! This project showcases my journey as a backend developer through an engaging and dynamic terminal interface. Experience my technical skills through interactive coding challenges, project showcases, and a fully functional terminal simulation.

## Features

- **Interactive Terminal**: Fully functional terminal simulation with commands, history, and real-time interaction
- **Multi-language Support**: Seamless switching between English, Spanish, and French with persistent preferences
- **Adventure Mode**: Interactive coding challenges that tell the story of real technical problems solved
- **Project Showcase**: Dynamic project display with multilingual content and status indicators
- **Tech Stack Visualization**: Interactive display of technologies and skill levels
- **Recruiter Mode**: Streamlined view for recruiters with essential information
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time State Management**: Persistent terminal state and command history

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend (Next.js + TypeScript)

The frontend is built using Next.js 13+ and TypeScript, providing a modern, interactive user experience:

```
frontend/
├── public/                 # Static assets (CVs, images)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AdventureLevel.tsx      # Interactive challenge component
│   │   ├── InteractiveTerminal.tsx # Main terminal interface
│   │   └── LanguageSwitcher.tsx    # Language selection component
│   ├── contexts/           # React contexts for state management
│   │   ├── LanguageContext.tsx     # Multi-language support
│   │   └── TerminalContext.tsx     # Terminal state management
│   ├── interfaces/         # TypeScript interfaces by domain
│   │   ├── adventureInterfaces.ts  # Adventure-related types
│   │   ├── apiInterfaces.ts        # API response types
│   │   ├── commonInterfaces.ts     # Shared component types
│   │   ├── languageInterfaces.ts   # Language context types
│   │   ├── levelInterfaces.ts      # Level and challenge types
│   │   ├── projectInterfaces.ts    # Project data types
│   │   └── terminalInterfaces.ts   # Terminal component types
│   ├── pages/              # Next.js pages
│   │   ├── _app.tsx        # App wrapper with providers
│   │   ├── about.tsx       # About page with detailed info
│   │   ├── adventure.tsx   # Interactive coding challenges
│   │   ├── index.tsx       # Main terminal interface
│   │   ├── projects.tsx    # Project showcase
│   │   ├── recruiter.tsx   # Recruiter-focused view
│   │   └── stack.tsx       # Tech stack visualization
│   ├── styles/             # Global styles
│   │   └── globals.css     # CSS variables and global styles
│   ├── types/              # TypeScript type exports
│   │   └── index.ts        # Centralized type exports
│   └── utils/              # Utility functions
│       └── api.ts          # API communication functions
```

### Backend (Ruby on Rails)

The backend is built using Ruby on Rails and provides a robust API with multilingual support:

```
backend/
├── app/
│   ├── controllers/        # API controllers
│   │   ├── projects_controller.rb
│   │   └── levels_controller.rb
│   ├── models/             # Data models with concerns
│   │   ├── concerns/
│   │   │   ├── multilingual.rb    # Multi-language support
│   │   │   ├── searchable.rb      # Search functionality
│   │   │   └── timestampable.rb   # Time-based scopes
│   │   ├── project.rb
│   │   └── level.rb
│   └── views/              # JSON responses
├── db/
│   ├── seeds.rb            # Main seed data
│   ├── seeds_projects.rb   # Project data
│   └── seeds_levels.rb     # Level challenges
└── config/                 # Configuration files
```

## How to Use

### Terminal Commands

The portfolio features a fully interactive terminal with these commands:

- `help` - Show available commands
- `start` - Begin the coding adventure
- `about` - Learn about Stef
- `projects` - View portfolio projects
- `stack` - See tech stack and skills
- `recruiter-mode` - Fast track for recruiters
- `clear` - Clear terminal screen
- `lang [es|en|fr]` - Change language

### Adventure Mode

Navigate through interactive coding challenges that showcase real problem-solving scenarios:

1. **Authentication Issues** - Debug token validation problems
2. **Infrastructure Optimization** - Improve deployment pipelines
3. **API Design** - Optimize endpoint performance
4. **System Integration** - Fix gamification features

## Technologies Used

### Frontend

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: CSS with custom properties and responsive design
- **State Management**: React Context API
- **API Communication**: Fetch API with error handling

### Backend

- **Framework**: Ruby on Rails 7.0+
- **Database**: PostgreSQL with JSONB support
- **Multilingual**: JSONB fields for content (EN, ES, FR)
- **Architecture**: RESTful API with modular concerns
- **Security**: Environment variables and CORS configuration

## Getting Started

### Prerequisites

- Node.js 18+
- Ruby 3.0+
- Rails 7.0+
- PostgreSQL 12+

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   bundle install
   ```

3. **Set up the database**:

   ```bash
   ./bin/rails db:create
   ./bin/rails db:migrate
   ./bin/rails db:seed
   ```

4. **Start the Rails server**:
   ```bash
   ./bin/rails server
   ```

The API will be available at `http://localhost:3001`

## Development

### Available Scripts

**Frontend**:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

**Backend**:

- `./bin/rails server` - Start development server
- `./bin/rails console` - Access Rails console
- `./bin/rails test` - Run tests
- `./bin/rails db:reset` - Reset database

### Code Organization

- **Type Safety**: Strict TypeScript configuration with proper interface definitions
- **Modular Architecture**: Reusable concerns and components
- **Multilingual Support**: JSONB fields with language fallback system
- **API Design**: RESTful endpoints with proper error handling

### Environment Variables

**Frontend**:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

**Backend**:

```env
DATABASE_URL=your-database-url
SECRET_KEY_BASE=your-secret-key
RAILS_ENV=production
```

## License

This project is licensed under the MIT License. Feel free to use any components or code for your own projects.

**Note**: This is a personal portfolio project. No contributions, pull requests, or modifications are accepted.

---

Thank you for visiting my interactive portfolio! I hope you enjoy exploring my journey as a backend developer through this unique terminal experience.
