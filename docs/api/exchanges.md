# Exchanges Endpoints

These endpoints allow you to fetch, filter, and get detailed information about exchanges.

## 1. **GET** `/api/v1/exchanges`

- **Description**: Fetch a list of all exchanges.
- **Query Parameters**:
  - `type`: (optional) Filter by exchange type (e.g., stock, fund, commodity).
  - `currency`: (optional) Filter by the currency used in the exchange.
  - `country`: (optional) Filter by the country where the exchange operates.

## 2. **GET** `/api/v1/exchanges/:symbol`

- **Description**: Fetch detailed information about a specific exchange by its symbol.
- **Params**:
  - `symbol`: (required) The unique symbol for the exchange (e.g., `ALEZX.US`).

## 3. **GET** `/api/v1/exchanges/filters`

- **Description**: Returns unique values of `type`, `currency`, and `country` fields from the exchanges collection for use in filtering.