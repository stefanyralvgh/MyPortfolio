# Interactive Portfolio Backend

This is the backend for the Interactive Portfolio project, built using Ruby on Rails. The backend serves as the API that provides data to the frontend application, allowing users to interact with various levels of achievements and interesting facts about the developer's journey.

## Features

- **RESTful API**: The backend exposes a RESTful API for fetching level data.
- **Dynamic Data**: The levels can be unlocked dynamically, providing a unique experience for each user.
- **Database Integration**: Utilizes a PostgreSQL database to store and manage level data.

## Getting Started

### Prerequisites

- Ruby (version 3.0 or higher)
- Rails (version 7.0 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/interactive-portfolio.git
   cd interactive-portfolio/backend
   ```

2. Install the required gems:
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

The backend will be running at `http://localhost:3000`.

## API Endpoints

- `GET /levels`: Retrieves a list of all levels.
- `GET /levels/:id`: Retrieves a specific level by ID.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.