# **Database Overview: MongoDB and Redis Integration**

The backend system utilizes **MongoDB** as the primary database and **Redis** as a caching layer to achieve high performance, scalability, and reliability.

---

### **MongoDB (Primary Database)**

- **Purpose**: Stores persistent, structured, and semi-structured data such as financial instruments, time-series data, user preferences, and metadata.
- **Key Collections**:
    - **`exchanges`**: Holds details of financial instruments and exchange-related metadata.
    - **`candles`**: Stores time-series data (e.g., price, volume) for instruments.
    - **`favorites`**: Manages user-specific favorite instruments.
    - **`metadata`**: Contains details for financial instruments.

---

### **Redis (Caching Layer)**

- **Purpose**: Provides an in-memory caching solution to improve query response times and reduce the load on MongoDB for frequently accessed data.
- **Use Cases**:
    - **Caching Hot Data**: Frequently queried data, such as the latest candles or metadata , are stored in Redis for instant access.

### **Redis Key Features**:

1. **In-Memory Speed**: Extremely low-latency data retrieval for caching hot data.
2. **TTL (Time-to-Live)**: Automatic expiration of cached data ensures up-to-date information.
3. **Scalability**: Supports horizontal scaling for increased performance under high loads.