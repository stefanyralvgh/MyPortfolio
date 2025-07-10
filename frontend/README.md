# Interactive Portfolio Frontend

This is the frontend part of Stef's Interactive Portfolio project, built using Next.js and TypeScript. The portfolio is designed to showcase backend development skills through an interactive terminal simulation that feels like a real developer experience.

## Features

- **Interactive Terminal**: A fully functional terminal simulation with commands, history, and real time interaction
- **Multi-language Support**: Seamless switching between English, Spanish, and French with persistent language preferences
- **Adventure Mode**: Interactive coding challenges that tell the story of real technical problems solved
- **Project Showcase**: Dynamic project display with multilingual content and status indicators
- **Tech Stack Visualization**: Interactive display of technologies and skill levels
- **Recruiter Mode**: Streamlined view for recruiters with essential information
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time State Management**: Persistent terminal state and command history

## Project Structure

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
│   ├── interfaces/         # TypeScript interfaces
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
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Technologies Used

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: CSS with custom properties and responsive design
- **State Management**: React Context API
- **API Communication**: Fetch API with error handling
- **Build Tool**: Next.js built-in bundler
- **Development**: Hot reloading and TypeScript compilation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd MyPortfolio/frontend
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## How to Use

### Terminal Commands

The portfolio features a fully interactive terminal with these commands:

- `help` - Show available commands
- `start` - Begin the coding adventure
- `about` - Learn about Stef
- `projects` - View portfolio projects
- `stack` - See tech stack and skills
- `recruiter` - Fast track for recruiters
- `clear` - Clear terminal screen
- `lang [es|en|fr]` - Change language

### Adventure Mode

Navigate through interactive coding challenges that showcase real problem-solving scenarios:

1. **Authentication Issues** - Debug token validation problems
2. **Infrastructure Optimization** - Improve deployment pipelines
3. **API Design** - Optimize endpoint performance
4. **System Integration** - Fix gamification features

## Development

### Code Organization

- **Interfaces**: All TypeScript interfaces are organized by domain in the `interfaces/` directory
- **Components**: Reusable components with clear separation of concerns
- **Contexts**: Global state management for language and terminal state
- **Pages**: Next.js pages with server-side rendering capabilities

### Adding New Features

1. **New Commands**: Add to `InteractiveTerminal.tsx` command handler
2. **New Pages**: Create in `pages/` directory
3. **New Components**: Add to `components/` with proper TypeScript interfaces
4. **New Translations**: Add to `LanguageContext.tsx` for all supported languages

### Type Safety

The project uses strict TypeScript configuration with:

- Proper interface definitions for all data structures
- Type-safe API communication
- Component prop validation
- Context type safety

## Deployment

### Environment Variables

For production deployment, set these environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NODE_ENV=production
```

### Build Process

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm run start
   ```

### Deployment Platforms

The frontend can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any static hosting service**

## License

This project is licensed under the MIT License. Feel free to use any components or code for your own projects.

**Note**: This is a personal portfolio project. No contributions, pull requests, or modifications are accepted.
