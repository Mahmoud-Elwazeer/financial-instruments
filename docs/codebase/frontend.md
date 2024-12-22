# Frontend Components (React, Vite)

The frontend of this project is built using **React** and **Vite**. React is used to build the user interface with components, while Vite is used as the build tool for fast development and efficient bundling. The project is structured to allow for easy management of components, services, contexts, hooks, and pages, providing a smooth user experience.

## Key Components

### 1. **React**

- **Why React?**
    - **Component-based architecture**: React’s component-based architecture allows for reusable, modular components, which makes it easier to manage complex UIs. This is ideal for building dynamic interfaces, such as dashboards or charts.
    - **Virtual DOM**: React uses a virtual DOM, which helps improve performance by minimizing direct updates to the actual DOM.
    - **State management**: React’s built-in state management (using `useState`, `useReducer`, and `Context API`) is sufficient for managing UI states, such as selected filters, favorites, and chart data.
    - **Ecosystem and community**: React has a large community, which means plenty of available libraries and resources for any feature we want to implement, such as charts or UI components.

### 2. **Vite**

- **Why Vite?**
    - **Fast build tool**: Vite provides fast bundling and HMR (Hot Module Replacement) during development. It is built on top of modern JavaScript tooling, such as ESBuild, to provide near-instant feedback during development.
    - **Optimized for React**: Vite comes with built-in support for React, allowing us to leverage features like JSX, fast reloads, and automatic optimizations.
    - **Zero configuration**: Vite is designed to work out of the box, with minimal configuration required, which speeds up the setup and development process.

## Directory Structure

The directory structure is organized to promote separation of concerns and modularity. Below is an overview of the folder structure:

```graphql
/src
├── App.tsx                        # Main entry point of the application.
├── components                     # Reusable UI components
│   ├── candles                    # Candle chart related components
│   │   ├── CandleChartTooltip.tsx  # Tooltip for candle chart.
│   │   ├── CandleChart.tsx         # Candle chart component.
│   │   └── useChartConfig.ts      # Custom hook for chart configuration.
│   ├── charts                      # General chart-related components
│   │   ├── AreaChartTooltip.tsx    # Tooltip for area chart.
│   │   ├── AreaChart.tsx           # Area chart component.
│   │   ├── ChartContainer.tsx      # Container for charts.
│   │   ├── ChartHeader.tsx         # Header component for charts.
│   │   ├── ChartSection.tsx        # Section for charts (new component).
│   │   ├── ChartToggle.tsx         # Toggle between chart types.
│   │   └── PopupChart.tsx          # Popup modal for chart display.
│   ├── dateRange                   # Date range selector component
│   │   └── DateRangeSelector.tsx   # Component for selecting date ranges.
│   ├── ErrorMessage                # Component for displaying error messages.
│   │   └── ErrorMessage.tsx
│   ├── exchanges                   # Exchange-related components
│   │   ├── ExchangeList.tsx        # List of exchanges.
│   │   ├── FavoriteButton.tsx      # Button to mark exchanges as favorites.
│   │   └── NoExchangeSelected.tsx  # Component for when no exchange is selected.
│   ├── filters                     # Components for filters
│   │   ├── FilterPanel.tsx         # Panel containing filters.
│   │   ├── FilterSection.tsx       # Individual filter section.
│   │   └── MultiSelect.tsx         # Multi-select dropdown for filter options.
│   ├── layout                      # Layout components
│   │   ├── Footer.tsx              # Footer component.
│   │   ├── Header.tsx              # Header component.
│   │   └── MainContent.tsx         # Main content area for the app.
│   ├── loadingPage                 # Components for loading states.
│   │   └── LoadingSpinner.tsx      # Spinner to show during loading.
│   ├── metadata                    # Components for displaying metadata
│   │   └── MetadataDisplay.tsx     # Display metadata for financial instruments.
│   ├── theme                       # Theme related components
│   │   └── ThemeToggle.tsx         # Button to toggle dark/light theme.
│   └── ui                          # Generic UI components
│       └── Modal.tsx               # Modal component for showing content in popups.
├── contexts                        # React contexts for managing global state.
│   └── ThemeContext.tsx            # Context for managing the theme (dark/light mode).
├── hooks                           # Custom hooks for various functionality.
│   ├── useCandles.ts               # Hook for managing candles data.
│   ├── useExchangeFilters.ts       # Hook for managing and applying filters.
│   └── useFavorites.ts             # Hook for managing favorite exchanges.
├── index.css                       # Global styles for the app.
├── main.tsx                        # Entry point for React app.
├── pages                           # Pages for different routes.
│   ├── ExchangePage.tsx            # Page for viewing exchange details.
│   └── FavoritesPage.tsx           # Page for viewing favorite exchanges.
├── services                        # Services for interacting with APIs.
│   └── api                         # Contains services for API requests.
│       ├── candles.ts              # API functions for fetching candle data.
│       ├── config.ts               # Configuration file for API requests.
│       ├── exchanges.ts            # API functions for fetching exchange data.
│       ├── favorites.ts            # API functions for managing favorites.
│       ├── index.ts                # General API functions (e.g., error handling).
│       └── metadata.ts             # API functions for fetching metadata.
├── types                           # TypeScript type definitions.
│   ├── api                         # Types for API responses.
│   ├── candle.ts                   # Types for candle data.
│   ├── exchange.ts                 # Types for exchange data.
│   ├── favorite.ts                 # Types for favorite exchanges.
│   ├── filters.ts                  # Types for filter options.
│   └── metadata.ts                 # Types for metadata.
├── utils                           # Utility functions.
│   └── formatters.ts               # Helper functions for formatting data.
└── vite-env.d.ts                   # Vite environment types for TypeScript.


```

## Key Concepts

### 1. **Components**

- **Reusable Components**: The components are organized by feature (e.g., candles, charts, exchanges) and are highly reusable across the app. This helps in maintaining the UI and makes it easier to manage.
- **UI/Functional Separation**: Components like `FilterPanel.tsx` are responsible for rendering the UI, while hooks like `useExchangeFilters.ts` manage the business logic, ensuring clear separation of concerns.

### 2. **Pages**

- **ExchangePage(Home Page)**: This page displays the list of exchanges and allows users to view details of each exchange.
- **FavoritesPage**: This page shows the user's favorite exchanges, leveraging the `FavoriteButton` component to add/remove favorites.

### 3. **Hooks**

- **useExchangeFilters**: Custom hook to manage filter states (e.g., type, currency, country) and apply them to exchange data.
- **useFavorites**: Custom hook to manage the user's favorite exchanges by interacting with the backend.

- **useCandles**: A custom hook that will manage fetching and updating candle data. This could be used for charting or displaying historical data for selected exchanges.

### 4. **Services**

Services are used to interact with the backend APIs. Each API service is encapsulated in a separate file under the `services/api/` directory:

- **candles.ts**: Handles API calls related to candle data.
- **exchanges.ts**: Handles API calls related to exchanges.
- **favorites.ts**: Manages the API calls for adding/removing exchanges from the user's favorites.
- **metadata.ts**: Handles API calls for metadata related to financial instruments.

### 5. **State Management (Context API)**

- **ThemeContext.tsx**: Provides global theme management (dark/light mode) to the entire app, using React’s Context API to share the theme state.

### 6. **Styling**

- **CSS**: Global styling is handled in `index.css`. Component-specific styles are scoped within each component using standard CSS or CSS modules, depending on the requirements.

### 7. **TypeScript Types**

- The app uses **TypeScript** to define types for API responses and data structures (e.g., `candle.ts`, `exchange.ts`). This helps in ensuring type safety and improves developer experience by providing autocompletion and reducing runtime errors.


This structure ensures the frontend is modular, easy to maintain, and scalable, with clear separation between UI components, business logic, and API services.