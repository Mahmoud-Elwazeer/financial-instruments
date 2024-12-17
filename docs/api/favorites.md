# Favorites Endpoints

These endpoints allow users to add, retrieve, and remove exchanges from their favorites list.

### **POST** `/api/v1/favorites`

- **Description**: Add an exchange to the user's favorites.
- **Body (JSON)**:
    
    ```json
    {
        "symbol": "ALEZX.US"
    }
    
    ```
    

### **GET** `/api/v1/favorites`

- **Description**: Get all exchanges that the user has added to their favorites.

### **DELETE** `/api/v1/favorites/:symbol`

- **Description**: Remove an exchange from the user's favorites by its symbol.
- **Params**:
    - `symbol`: (required) The symbol of the exchange to be removed (e.g., `ALEZX.US`).