# Codebase Overview

This project consists of both a backend and frontend application. The backend is built using **Express.js** and **Node.js**, while the frontend is developed using **React** and **Vite**.

The main goal of this project is to provide a platform for retrieving and interacting with financial data, including exchanges, candles, and metadata, as well as allowing users to manage their favorite exchanges.

## Directory Structure

- **/backend/src**: Contains the backend application files.
  - **/controllers**: Logic for handling HTTP requests.
  - **/models**: Database models for MongoDB.
  - **/routes**: Defines API routes.
  - **/services**: Helper services for controllers
  - **/configurations**: Configuration files for database connection.
  - **/middlewares**: Middleware functions for error handling and logging.
  - **/utils**: Utility functions.
  - **/tests**:  Unit tests for various controllers.
- **/frontend/src**: Contains the frontend application files.
  - **/components**: React components.
  - **/pages**: React pages that map to routes.
  - **/utils**: Helper functions for formatting data.
  - **/contexts**: for managing global state.
  - **/hooks**: for various functionality.
  - **/services**: Services for interacting with APIs.
  - **/type**: TypeScript type definitions.
  
## Key Features

- **API Endpoints**: Fetch and filter financial data (exchanges, candles, metadata).
- **Favorites System**: Allow users to add/remove exchanges to/from their favorites list.
- **Responsive UI**: A frontend built with React that is fast and responsive.

The code is structured to separate concerns, with clear distinctions between backend logic and frontend UI
