# **Database Design and Implementation for High Performance**

## **1. Database Overview**

The system uses **MongoDB** as the primary database, chosen for its flexibility, scalability, and ability to handle unstructured data efficiently. The database is designed to support high-performance queries, ensuring responsiveness even under heavy workloads.

### **Key Collections**

1. **`exchanges`** - Stores financial instrument details and exchange-related metadata.
2. **`candles`** - Contains time-series data such as price and volume for instruments.
3. **`favorites`** - Manages user preferences for tracking specific instruments.
4. **`metadata`** - Holds additional information and details for financial instruments.

---

## **2. Design Principles for High Performance**

### **a. Normalization with Denormalization When Needed**

- **Normalization**: Key relationships are maintained using **references** (`symbol` field) between collections like  `favorites`, and `exchanges`. This reduces redundancy and ensures data consistency.
- **Denormalization**: Some additional metadata fields (like addressDetails, statistics) are included directly in relevant documents to optimize query performance and reduce the need for frequent joins/population.

---

### **b. Indexing Strategy**

To achieve fast query performance, **indexes** are implemented on frequently queried fields. Key highlights include:

1. **Unique Indexes**:
    - Ensures no duplicate records for critical identifiers like `symbol` in `exchanges` and `(symbol, dateTime)` in `candles`.
2. **Single-Field Indexes**:
    - On fields like `type`, `currency`, and `country` in `exchanges` to support filtering operations.
3. **Compound Indexes**:
    - Multi-field indexes like `{ type: 1, currency: 1, country: 1 }` in `exchanges` enable efficient multi-criteria queries.
    - `{ symbol: 1, dateTime: 1 }` in `candles` ensures quick lookups for time-series data.

**Why Indexing Matters**:

- Improves read performance significantly.
- Supports sorting and filtering operations without full document scans.
- Reduces latency for frequently executed queries.

---

### **c. Efficient Query Patterns**

1. **Primary Key Access**:
    
    Queries are designed to leverage indexed fields, like `symbol`, as primary keys for fast lookups.
    
    - Example: Fetching a financial instrument from `exchanges` by `symbol`.
2. **Range Queries for Time-Series Data**:
    
    The `candles` collection uses `{ symbol, dateTime }` indexing to support queries for price data over a date range.
    
    - Example: Fetching candles for a given instrument within a specific time frame.

---

### **d. Schema Design for Scalability**

1. **Timestamps**:
    
    All collections include `createdAt` and `updatedAt` fields (via Mongoose `timestamps`), which enable efficient sorting, auditing, and time-based queries.
    
2. **Dynamic Fields**:
    
    For fields with varying structures (e.g., `statistics`, `dividends`, `marketCapitalization` in `metadata`), `Schema.Types.Mixed` is used. This allows flexibility without strict enforcement, ensuring scalability.
    
3. **Virtual Population**:
    
    Relationships are resolved using **Mongoose virtuals** where needed, such as populating `exchange` details in `favorites`. This reduces redundancy while providing clean access to related data.
    

---


## **3. Scalability Considerations**

1. **Document Size Management**:
    
    Large documents (e.g., `metadata`) are designed to keep optional and infrequently accessed data in arrays or mixed types to manage MongoDB’s document size limits.
    
2. **Caching with Redis**:
    - Frequently accessed queries (e.g., favorite instruments or latest candle data) are cached using **Redis**.
    - Reduces load on MongoDB and improves response time.



