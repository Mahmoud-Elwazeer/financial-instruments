# Candles Endpoints

These endpoints provide historical candle data for each financial instrument.

## 1. **GET** `/api/v1/candles/:symbol`

- **Description**: Fetch historical candle data for a specific financial instrument.
- **Params**:
  - `symbol`: (required) The symbol of the financial instrument (e.g., `PL.COMM`).
- **Query Parameters**:
  - `from`: (optional) The start date for the historical data in `YYYY-MM-DD` format (e.g., `2024-01-01`).
  - `to`: (optional) The end date for the historical data in `YYYY-MM-DD` format (e.g., `2024-12-31`).