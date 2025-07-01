# Interactive Portfolio Frontend

This is the frontend part of the Interactive Portfolio project, built using Next.js. The portfolio is designed to showcase the backend development skills of the creator in an interactive and engaging manner.

## Features

- **Multi-language Support**: Users can switch between English, Spanish, and French to make the portfolio accessible to a wider audience.
- **Interactive Levels**: Users can unlock various levels to explore achievements and interesting facts about the creator's career.
- **Dynamic Content**: The portfolio fetches data from a Ruby on Rails backend to display achievements and milestones.

## Project Structure

- `public/`: Contains static files like the favicon.
- `src/`: Contains the source code for the application.
  - `components/`: Reusable components for the application.
    - `LanguageSwitcher.tsx`: Component for switching languages.
    - `LevelCard.tsx`: Component for displaying individual level cards.
    - `WelcomeScreen.tsx`: Component for the welcome message and start button.
  - `pages/`: Contains the application's pages.
    - `_app.tsx`: Custom App component for initializing pages.
    - `index.tsx`: Main entry point rendering the WelcomeScreen.
    - `levels.tsx`: Page for displaying unlockable levels.
  - `styles/`: Contains global styles for the application.
    - `globals.css`: Global CSS styles.
  - `utils/`: Utility functions for API calls.
    - `api.ts`: Functions for fetching level data from the backend.
- `package.json`: Configuration file for npm, listing dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.

## Getting Started

To get started with the frontend application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd interactive-portfolio/frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.