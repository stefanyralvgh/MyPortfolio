# Interactive Portfolio

Welcome to my interactive portfolio! This project showcases my journey as a backend developer through an engaging and dynamic interface. Here, you can explore various levels that highlight my achievements, experiences, and interesting facts about my career.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using Next.js and is responsible for the user interface. It includes:

- **Public Assets**: Contains static files like the favicon.
- **Components**: Reusable components such as:
  - `LanguageSwitcher.tsx`: Allows users to switch between English, Spanish, and French.
  - `LevelCard.tsx`: Displays individual level cards for unlocking achievements.
  - `WelcomeScreen.tsx`: Presents the welcome message and the start button.
- **Pages**: The main entry points of the application:
  - `_app.tsx`: Custom App component for initializing pages.
  - `index.tsx`: The landing page that renders the WelcomeScreen.
  - `levels.tsx`: Displays the levels that users can unlock.
- **Styles**: Global styles for the application.
- **Utils**: Utility functions for making API calls to the backend.

### Backend

The backend is built using Ruby on Rails and handles data management and API responses. It includes:

- **Controllers**: Manages requests and responses, specifically for levels.
- **Models**: Defines the data structure and business logic for levels.
- **Views**: Renders data in JSON format for API responses.
- **Config**: Contains configuration files for routes and database settings.
- **Database**: Migration files and schema definitions for the database.

## Features

- **Multi-language Support**: Users can switch between English, Spanish, and French.
- **Interactive Levels**: Users can unlock levels to learn about my achievements and experiences.
- **Dynamic Content**: Each level reveals interesting facts and technical details about my work.

## Getting Started

To run this project locally, follow these steps:

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   bundle install
   ```
3. Set up the database:
   ```
   rails db:create
   rails db:migrate
   ```
4. Start the Rails server:
   ```
   rails server
   ```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and suggestions are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).

Thank you for visiting my interactive portfolio! I hope you enjoy exploring my journey as a backend developer.
