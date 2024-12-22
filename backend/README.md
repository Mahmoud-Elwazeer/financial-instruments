# **Overview**

The backend of this application is built to provide high-performance APIs for managing financial instruments, historical data, user preferences, and metadata. It leverages modern technologies to ensure scalability, maintainability, and reliability.

---

## **Technologies Used**

- **Node.js**: Runtime environment for building the server-side application.
- **Express.js**: Framework for creating RESTful APIs.
- **MongoDB**: Primary database for persistent storage of structured and semi-structured data.
- **Redis**: In-memory database used for caching and session management.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to simplify schema design and database interaction.
- **Jest**: Testing framework for unit and integration tests.
- **Dotenv**: For environment variable management.

---

## **Installation**

1. **Clone the Repository**:
    
    ```bash
    git clone https://github.com/Mahmoud-Elwazeer/financial-instruments.git

    cd financial-instruments/backend
    ```
    
2. **Install Dependencies**:
    
    ```bash
    npm install
    ```
    
3. **Set Up Environment Variables**:
Create a `.env` file in the root directory and configure the following variables:
    
    ```
    NODE_ENV=dev
    PORT=3000
    DB_HOST=127.0.0.1
    DB_PORT=27017
    DB_DATABASE=financial_instruments
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379

    # Cache Expiry Time in seconds
    ExpiryTimeForCache=3600
    ```
    

---

### **Running the Application**

1. **Start MongoDB**:
Ensure MongoDB is running on the specified `DB_HOST` and `DB_PORT`.
2. **Start Redis**:
Run Redis on the specified `REDIS_HOST` and `REDIS_PORT`.
3. **Run the Server**:
    
    ```bash
    npm start
    ```
    
4. **Access the API**:
Open `http://localhost:3000` in your browser or API client.

---

### **Testing**

- **Run Tests**:
    
    ```bash
    npm test
    ```
    

---

### **Deployment**

1. **Start MongoDB**:
Ensure MongoDB is running on the specified `DB_HOST` and `DB_PORT`.
2. **Start Redis**:
Run Redis on the specified `REDIS_HOST` and `REDIS_PORT`.
3. **Prepare the Environment**:
    
    Set environment variables for the production environment in `pm2.config.cjs`.
    
4. **Build and Start**:
    - Use a process manager like **PM2** to manage the backend in production:
        
        ```bash
        npm install -g pm2
        pm2 start pm2.config.cjs
        
        ```
        

---



## **Key Features**

- **RESTful APIs**: Robust endpoints for managing financial data.
- **High Performance**: Optimized queries and caching using Redis.
- **Scalable Architecture**: Designed for horizontal and vertical scaling.
- **Secure**: Adheres to best practices for API security and environment isolation.