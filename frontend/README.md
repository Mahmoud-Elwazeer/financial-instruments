# **Overview**

The frontend of this application is built with **React**, **Vite**, and **TypeScript**. It includes various features such as charts, exchange data display, and filtering functionalities, designed to provide a smooth user experience with interactive UI elements.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation front-end tool for fast builds and development.
- **TypeScript**: Adds static types to JavaScript, improving code quality and development experience.

## Key Features

- **Candlestick Chart**: Displays financial data using interactive candlestick charts with tooltips.
- **Area Chart**: Visualizes data trends using an area chart.
- **Exchange List & Favorites**: Displays available exchanges and allows users to mark favorites.
- **Filters**: Allows users to filter data based on various criteria with multi-select options.
- **Responsive Layout**: Adaptive UI with a header, footer, and main content area.
- **Theme Toggle**: Switch between light and dark themes.
- **Error Handling**: Displays user-friendly error messages when something goes wrong.
- **Loading Spinner**: Indicates loading state for better user experience.
- **Metadata Display**: Shows additional information related to data and charts.

## Installation

1. **Clone the repository**:
    
    ```bash
    git clone https://github.com/Mahmoud-Elwazeer/financial-instruments.git
    
    cd financial-instruments/frontend
    ```
    
2. **Install dependencies**:
    
    ```bash
    npm install
    ```
    

3. **Set Up Environment Variables**:

Create a `.env` file in the root directory and configure the following variables:

```markdown
VITE_API_URL=<API_URL>
```

## Running the Project

To start the development server, run:

```bash
npm run dev
```

This will start the application locally at `http://localhost:5173`.

## Deployment

To deploy the application, follow these steps:

1. **Build the project**:
    
    ```bash
    npm run build
    ```
    
2. **Deploy the `dist/` folder** to your hosting provider (e.g., Vercel, Netlify, or a custom server).
