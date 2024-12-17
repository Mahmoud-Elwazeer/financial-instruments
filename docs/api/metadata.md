# Metadata Endpoints

These endpoints provide detailed metadata about different financial instruments, including Cryptocurrency, stocks, funds, etc..

## 1. **GET** `/api/v1/metadata/:symbol`

- **Description**: Fetch metadata for a specific financial instrument by its symbol.
- **Params**:
  - `symbol`: (required) The unique symbol or identifier for the financial instrument (e.g., `18MS.XETRA`).
