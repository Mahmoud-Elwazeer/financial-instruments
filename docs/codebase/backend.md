# Backend Components (Express, MongoDB, Redis)

The backend of this project is built using **Express.js**, **MongoDB**, and **Redis**. The purpose of this backend is to provide API endpoints that interact with the database and cache data efficiently. Let's break down the components and explain the reasoning behind the technology choices.

## Key Components

### 1. **Express.js**

- **Why Express?**
    - **Minimal and flexible**: Express provides a minimal framework to build RESTful APIs, making it easy to handle routing, middleware, and HTTP requests. This flexibility allows you to scale and add more complex features as needed.
    - **Large community**: Express is one of the most widely used Node.js frameworks, meaning there's a wealth of documentation, tools, and community support available.
    - **Middleware support**: Express supports middleware for handling tasks like logging, authentication, error handling, etc., which are essential for any production-grade API.

### 2. **MongoDB**

- **Why MongoDB?**
    - **Document-based storage**: MongoDB is a NoSQL database that stores data in JSON-like documents, which makes it more flexible and easier to scale. This is especially beneficial when working with financial data that may have varied structures.
    - **Scalability**: MongoDB can scale horizontally by sharding, making it a great choice for applications with large datasets or high throughput.
    - **Aggregation framework**: MongoDB’s powerful aggregation pipeline makes it easy to process and analyze financial data.
    - **JSON-like format**: Since the data exchanged in this project is mostly JSON (financial data), MongoDB is a natural fit for storing and retrieving such data.

### 3. **Redis**

- **Why Redis?**
    - **In-memory caching**: Redis is used to cache frequently accessed data, reducing the load on MongoDB and improving performance. For example, exchange data and candle data that don’t change frequently can be cached for a specified duration (e.g., 1 hour).
    - **Speed**: Redis is extremely fast due to its in-memory nature. This allows for quick retrieval of data, making it ideal for reducing latency in real-time applications.
    - **Pub/Sub and data expiration**: Redis also supports pub/sub mechanisms for real-time updates and allows data to be cached with an expiration time, ensuring data freshness.

## Directory Structure

Here’s a breakdown of the directory structure and how each part fits into the overall backend application.

```bash
/backend
├── app.js                        # Main entry point of the application.
├── configurations                # Configuration files for database and Redis setup.
│   ├── database.js               # MongoDB connection configuration.
│   └── redis.js                  # Redis connection configuration.
├── controllers                   # Contains logic for handling requests.
│   ├── candle.js                 # Controller for candle data.
│   ├── exchange.js               # Controller for exchange data.
│   ├── favorite.js               # Controller for managing favorite exchanges.
│   └── metadata.js               # Controller for metadata of financial instruments.
├── middlewares                   # Middleware functions like error handling.
│   └── errorMiddleware.js        # Handles errors globally in the application.
|   └── logMiddleware.js          # Handles logging Requets
├── models                        # MongoDB schemas for data models.
│   ├── candle.js                 # Candle data model schema.
│   ├── exchange.js               # Exchange data model schema.
│   ├── favorite.js               # User favorite exchange model schema.
│   └── metadata.js               # Metadata model schema for financial instruments.
├── routes                        # Defines API routes for different resources.
│   ├── candle.js                 # Routes for candle data endpoints.
│   ├── exchange.js               # Routes for exchange data endpoints.
│   ├── favorite.js               # Routes for managing favorites.
│   ├── index.js                  # Main route file for setting up API routes.
│   └── metadata.js               # Routes for metadata-related endpoints.
├── server.js                     # The server entry point, sets up and starts Express.
├── services                      # Contains business logic for different resources.
│   ├── candle.js                 # Service for candle data processing.
│   ├── exchange.js               # Service for exchange data logic.
│   ├── favorite.js               # Service for managing favorites logic.
│   └── metadata.js               # Service for metadata logic.
├── tests                         # Unit tests for various components.
│   ├── candle.test.js            # Tests for candle data.
│   ├── exchange.test.js          # Tests for exchange data.
│   ├── favorite.test.js          # Tests for favorite exchanges.
│   └── metadata.test.js          # Tests for metadata.
└── utils                         # Utility functions and helper files.
    ├── apiError.js               # Helper for creating standardized API error responses.
    ├── data                      # Sample data for testing or seeding.
    │   ├── candle.json           # Sample candle data.
    │   ├── exchange.json         # Sample exchange data.
    │   └── metadata.json         # Sample metadata data.
    ├── dataSeeder.js             # Seeder for populating the database with sample data.
    └── redis.js                  # Helper functions for Redis interactions (e.g., caching).

```

## Configuration

### 1. **Database Configuration (MongoDB)**

- **`configurations/database.js`**: This file contains the configuration to connect to the MongoDB database using the **mongoose** library.
    - **MongoDB URI**: The database connection string is constructed from environment variables, including `DB_HOST`, `DB_PORT`, and `DB_DATABASE`.


### 2. **Redis Configuration**

- **`configurations/redis.js`**: This file contains the Redis client configuration.
    - Redis is used for caching and other in-memory data storage, with an expiry time of 1 hour (using `ExpiryTimeForCache`).
    - Redis connection details are configured using `REDIS_HOST` and `REDIS_PORT`.



### 3. **Environment Variables**

- **`.env`**: This file stores sensitive information and configuration settings, such as database credentials and Redis settings.

```env
NODE_ENV='production'
PORT=3000

DB_HOST='127.0.0.1'
DB_PORT=27017
DB_DATABASE='financial_instrument'

REDIS_HOST='127.0.0.1'
REDIS_PORT=6379

ExpiryTimeForCache=3600
```
